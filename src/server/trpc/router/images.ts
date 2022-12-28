import { router, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client";

const defaultImageSelect = Prisma.validator<Prisma.ImagesSelect>()({
  id: true,
  userId: true,
  prompt: true,
  url: true,
  createdAt: true,
  updatedAt: true,
});

export const imageRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(4),
        userId: z.string(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { limit, userId, cursor } = input;

      const items = await prisma.images.findMany({
        select: defaultImageSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: { userId: userId },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      // Remove the last item and use it as next cursor
      if (items.length > limit) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  byURL: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { url } = input;

      const post = await prisma.images.findUnique({
        where: { url },
        select: defaultImageSelect,
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${url}'`,
        });
      }
      return post;
    }),
  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        url: z.string(),
        prompt: z.string(),
      })
    )
    .mutation(
      async ({ input }) =>
        await prisma.images.create({
          data: input,
          select: defaultImageSelect,
        })
    ),
});
