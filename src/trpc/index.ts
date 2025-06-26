import { z } from "zod";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { Package, User, Vendor } from "@/payload-types";
import { version } from "os";
import { equal } from "assert";
import { query } from "express";
import { VENDOR_CATEGORIES } from "@/config";

function formatWithLeadingZero(num: number) {
  return num < 10 ? "0" + num : num;
}

export const appRouter = router({
  auth: authRouter,

  // getCategorizedVendors: publicProcedure.query(async () => {
  //   const payload = await getPayloadClient();
  //   var results = [];

  //   for (let x = 0; x < VENDOR_CATEGORIES.length; x++) {
  //     const { docs: vendorInCat } = await payload.find({
  //       collection: "vendors",
  //       pagination: false,
  //       sort: "",
  //     });
  //   }
  // }),

  getPackageTable: publicProcedure
    .input(
      z.object({
        packageId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const { docs: PackageList } = await payload.find({
        collection: "ExPackages",
        pagination: false,
        where: {
          vendor: { equals: input.packageId },
        },
        sort: "order",
      });

      return PackageList;
    }),

  getAllCoupons: publicProcedure.query(async () => {
    const payload = await getPayloadClient();

    const { docs: AllCoupons } = await payload.find({
      collection: "coupons",
      pagination: false,
      sort: "expiry",
    });

    return AllCoupons;
  }),

  transition: publicProcedure.mutation(async ({ input }) => {
    const payload = await getPayloadClient();

    console.log("Getting all likes..");

    const { docs: AllLikes } = await payload.find({
      collection: "likes",
      pagination: false,
    });

    console.log("Found all likes");

    for (let x = 0; x < AllLikes.length; x++) {
      let currentUser = AllLikes[x].user as User;

      console.log("Working on " + currentUser.email);
      console.log("Getting all likes by " + currentUser.email);

      const { docs: UserLikes } = await payload.find({
        collection: "likes",
        where: {
          user: { equals: currentUser.id },
        },
        pagination: false,
      });

      console.log("Found all likes by " + currentUser.email);

      for (let y = 0; y < UserLikes.length; y++) {
        let newVendor = UserLikes[y].vendor as Vendor;
        console.log(
          "Working on likes by " + currentUser.email + " and " + newVendor.name
        );

        for (let z = y + 1; z < UserLikes.length; z++) {
          let comparison = UserLikes[z].vendor as Vendor;

          if (newVendor.id === comparison.id) {
            console.log(
              "Found Similarities with " +
                newVendor.name +
                " and " +
                comparison.name
            );
            console.log(
              "newVendor.id: " +
                newVendor.id +
                ". comparison.id: " +
                comparison.id +
                "."
            );
            await payload.delete({
              collection: "likes",
              where: {
                user: { equals: currentUser.id },
                and: [{ vendor: { equals: comparison.id } }],
              },
            });

            console.log("Duplicate deleted.");
          }
        }
      }
    }
  }),

  checkChat: publicProcedure
    .input(z.object({ userId: z.string(), vendorId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const { docs: chat } = await payload.find({
        collection: "chats",
        where: {
          user: { equals: input.userId },
          and: [{ vendor: { equals: input.vendorId } }],
        },
      });

      return chat;
    }),

  getAllVendorEnq: publicProcedure.query(async () => {
    const payload = await getPayloadClient();
    let results = [];
    let totalSSC = 0;
    let totalSSE = 0;

    const { docs: allVendors } = await payload.find({
      collection: "vendors",
      pagination: false,
    });

    for (let i = 0; i < allVendors.length; i++) {
      let totalC = 0;
      let totalE = 0;

      const { docs: queries } = await payload.find({
        collection: "chats",
        where: {
          vendor: { equals: allVendors[i].id },
        },
        pagination: false,
      });

      console.log("We are on: " + allVendors[i].name);

      if (queries.length > 0) {
        console.log("Found Queries");
        for (let q = 0; q < queries.length; q++) {
          totalC++;

          const { docs: msg } = await payload.find({
            collection: "message",
            where: {
              chat: { equals: queries[q].id },
            },
            pagination: false,
          });

          if (msg.length > 0) {
            console.log("Found Messages");
            let breakCondition = false;

            for (let m = 0; m < msg.length; m++) {
              if (msg[m].from == "user" && !breakCondition) {
                console.log("Found Message from User");
                totalE++;
                breakCondition = true;
              }
              console.log("Broke Condition");
            }
          }
        }
      }

      totalSSC = totalSSC + totalC;
      totalSSE = totalSSE + totalE;

      results.push({
        vendor: allVendors[i].name,
        cat: allVendors[i].category,
        chat: totalC,
        queries: totalE,
      });
    }
    results.push({
      vendor: "Sarang Sayang",
      cat: "The Website Itself duh",
      chat: totalSSC,
      queries: totalSSE,
    });
    return results;
  }),

  removeItemsFromPlan: publicProcedure
    .input(z.object({ planId: z.string(), version: z.number() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.version === 1) {
        await payload.delete({
          collection: "budget",
          where: {
            plan: { equals: input.planId },
            and: [{ ver: { exists: false } }],
          },
        });
      } else {
        await payload.delete({
          collection: "budget",
          where: {
            plan: { equals: input.planId },
            and: [{ ver: { equals: input.version } }],
          },
        });
      }
    }),

  addNewBudgetVersion: publicProcedure
    .input(z.object({ planId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const { docs: plan } = await payload.find({
        collection: "plans",
        where: { id: { equals: input.planId } },
        pagination: false,
      });

      if (!plan[0].totalVer || plan[0].totalVer === 0) {
        await payload.update({
          collection: "plans",
          where: { id: { equals: input.planId } },
          data: { totalVer: 2 },
        });
      } else {
        await payload.update({
          collection: "plans",
          where: { id: { equals: input.planId } },
          data: { totalVer: (plan[0].totalVer as number) + 1 },
        });
      }
    }),

  getSimilarVendors: publicProcedure
    .input(z.object({ vendorId: z.string(), category: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      let results = [];
      let rank = -1;

      const { docs: allVendors } = await payload.find({
        collection: "vendors",
        where: {
          category: { equals: input.category },
          and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
        },
        pagination: false,
      });

      for (let i = 0; i < allVendors.length; i++) {
        if (allVendors[i].id === input.vendorId) {
          rank = i;

          if (rank === 0) {
            results.push(allVendors[1]);
            results.push(allVendors[2]);
            results.push(allVendors[3]);
            results.push(allVendors[4]);
          } else if (rank === 1) {
            results.push(allVendors[0]);
            results.push(allVendors[2]);
            results.push(allVendors[3]);
            results.push(allVendors[4]);
          } else {
            results.push(allVendors[rank - 2]);
            results.push(allVendors[rank - 1]);
            results.push(allVendors[rank + 1]);
            results.push(allVendors[rank + 2]);
          }
        }
      }

      return results;
    }),

  getAllVendorLikes: publicProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      let results = [];

      if (input.category) {
        const { docs: allVendors } = await payload.find({
          collection: "vendors",
          where: { category: { equals: input.category } },
          sort: "-clicks",
          limit: 10,
        });

        for (let i = 0; i < allVendors.length; i++) {
          const { docs: enquiriesforthem } = await payload.find({
            collection: "chats",
            where: { vendor: { equals: allVendors[i].id } },
          });

          let messages = 0;
          let replies = 0;

          for (let x = 0; x < enquiriesforthem.length; x++) {
            const { docs: messagesfromuser } = await payload.find({
              collection: "message",
              where: {
                chat: { equals: enquiriesforthem[x].id },
                and: [
                  {
                    from: { equals: "user" },
                  },
                ],
              },
            });

            messages = messages + messagesfromuser.length;

            const { docs: repliesfromvendor } = await payload.find({
              collection: "message",
              where: {
                chat: { equals: enquiriesforthem[x].id },
                and: [
                  {
                    from: { equals: "vendor" },
                  },
                ],
                message: {
                  not_equals:
                    "This vendor has not claimed their profile, please expect a delay in their response.",
                },
              },
            });

            replies = replies + repliesfromvendor.length;
          }

          const newData = {
            ...allVendors[i],
            enquiries: messages,
            replies: replies,
          };

          results.push(newData);
        }
      } else {
        const { docs: allVendors } = await payload.find({
          collection: "vendors",
          sort: "-likes",
          limit: 10,
        });

        for (let i = 0; i < allVendors.length; i++) {
          const { docs: enquiriesforthem } = await payload.find({
            collection: "chats",
            where: { vendor: { equals: allVendors[i].id } },
          });

          let messages = 0;
          let replies = 0;

          for (let x = 0; x < enquiriesforthem.length; x++) {
            const { docs: messagesfromuser } = await payload.find({
              collection: "message",
              where: {
                chat: { equals: enquiriesforthem[x].id },
                and: [
                  {
                    from: { equals: "user" },
                  },
                ],
              },
            });

            messages = messages + messagesfromuser.length;

            const { docs: repliesfromvendor } = await payload.find({
              collection: "message",
              where: {
                chat: { equals: enquiriesforthem[x].id },
                and: [
                  {
                    from: { equals: "vendor" },
                  },
                ],
                message: {
                  not_equals:
                    "This vendor has not claimed their profile, please expect a delay in their response.",
                },
              },
            });

            replies = replies + repliesfromvendor.length;
          }

          const newData = {
            ...allVendors[i],
            enquiries: messages,
            replies: replies,
          };

          results.push(newData);
        }
      }

      return results;
    }),

  getClicks: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const vendor = await payload.find({
        collection: "vendors",
        where: {
          id: { equals: input.vendorId },
        },
        limit: 1,
      });

      if (vendor.docs[0].clicks) {
        return vendor.docs[0].clicks;
      } else {
        return 0;
      }
    }),

  addClick: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let clicks = 0;
      const payload = await getPayloadClient();

      const vendor = await payload.find({
        collection: "vendors",
        where: {
          id: { equals: input.vendorId },
        },
        limit: 1,
      });

      if (vendor.docs[0].clicks) {
        clicks = (vendor.docs[0].clicks as number) + 1;
      } else {
        clicks = 1;
      }

      await payload.update({
        collection: "vendors",
        where: {
          id: {
            equals: input.vendorId,
          },
        },
        data: {
          clicks: clicks,
        },
      });
    }),

  updateVendorFirstLog: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
        data: {
          vendorFirstLog: false,
        },
      });
    }),

  updateUserFirstLog: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
        data: {
          userFirstLog: false,
        },
      });
    }),

  sendWelcomeUserEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const result = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
      });

      return result;
    }),

  getMiscVendors: publicProcedure
    .input(
      z.object({
        category: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "misc",
        where: {
          id: { equals: "65b7aee5c17286ca4dd3e2ed" },
        },
        pagination: false,
      });

      if (input.category === "berkat") {
        return results.docs[0].berkat;
      } else if (input.category === "decor") {
        return results.docs[0].decor;
      } else if (input.category === "agent") {
        return results.docs[0].agent;
      } else if (input.category === "dulang") {
        return results.docs[0].dulang;
      } else if (input.category === "liveStation") {
        return results.docs[0].liveStation;
      } else if (input.category === "cake") {
        return results.docs[0].cake;
      } else if (input.category === "catering") {
        return results.docs[0].catering;
      } else if (input.category === "pakandam") {
        return results.docs[0].pakandam;
      } else if (input.category === "henna") {
        return results.docs[0].henna;
      } else if (input.category === "stationery") {
        return results.docs[0].stationery;
      } else if (input.category === "heels") {
        return results.docs[0].heels;
      } else if (input.category === "bridal") {
        let heelsid = [];
        const misclist = results.docs[0].heels as Vendor[];

        for (let i = 0; i < misclist.length; i++) {
          heelsid.push(misclist[i].id);
        }

        const results2 = await payload.find({
          collection: "vendors",
          where: {
            id: { not_in: heelsid },
            category: { equals: "bridals" },
            and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
          },
          pagination: false,
        });

        return results2.docs;
      } else if (input.category === "mua") {
        let pakandamid = [];
        const misclist = results.docs[0].pakandam as Vendor[];

        for (let i = 0; i < misclist.length; i++) {
          pakandamid.push(misclist[i].id);
        }

        const results2 = await payload.find({
          collection: "vendors",
          where: {
            id: { not_in: pakandamid },
            category: { equals: "mua" },
            and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
          },
          pagination: false,
        });

        return results2.docs;
      }
    }),

  deletePlan: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
      });
    }),

  removeUser2: publicProcedure
    .input(
      z.object({
        user1: z.string(),
        planId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "plans",
        where: {
          id: { equals: input.planId },
        },
        data: {
          user: [input.user1],
        },
      });
    }),

  addUser2: publicProcedure
    .input(
      z.object({
        user1: z.string(),
        user2: z.string(),
        planId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "plans",
        where: {
          id: { equals: input.planId },
        },
        data: {
          user: [input.user1, input.user2],
        },
      });
    }),

  checkUserExist: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
      });
    }),

  userRead: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "vendor") {
          await payload.update({
            collection: "message",
            where: {
              id: {
                equals: allmsg.docs[i].id,
              },
            },
            data: {
              read: true,
            },
          });
        }
      }
    }),

  userGetAllUnread: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const chat = await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
        },
      });

      if (chat.docs.length > 0) {
        for (let i = 0; i < chat.docs.length; i++) {
          const allmsg = await payload.find({
            collection: "message",
            where: {
              chat: {
                equals: chat.docs[i].id,
              },
            },
          });
          for (let i = 0; i < allmsg.docs.length; i++) {
            if (
              allmsg.docs[i].read === false &&
              allmsg.docs[i].from === "vendor"
            ) {
              results++;
            }
          }
        }
      }

      return results;
    }),

  userGetUnread: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
        pagination: false,
        sort: "-createdAt",
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "vendor") {
          results++;
        }
      }

      return results;
    }),

  vendorRead: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "user") {
          await payload.update({
            collection: "message",
            where: {
              id: {
                equals: allmsg.docs[i].id,
              },
            },
            data: {
              read: true,
            },
          });
        }
      }
    }),

  getAllUnread: publicProcedure
    .input(z.object({ vendorId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const chat = await payload.find({
        collection: "chats",
        where: {
          vendor: {
            equals: input.vendorId,
          },
        },
      });

      if (chat.docs.length > 0) {
        for (let i = 0; i < chat.docs.length; i++) {
          const allmsg = await payload.find({
            collection: "message",
            where: {
              chat: {
                equals: chat.docs[i].id,
              },
            },
          });
          for (let i = 0; i < allmsg.docs.length; i++) {
            if (
              allmsg.docs[i].read === false &&
              allmsg.docs[i].from === "user"
            ) {
              results++;
            }
          }
        }
      }

      return results;
    }),

  getUnread: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
        pagination: false,
        sort: "-createdAt",
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "user") {
          results++;
        }
      }

      return results;
    }),

  getMessages: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
        pagination: false,
        sort: "createdAt",
      });
    }),

  addMessage: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        from: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "message",
        data: {
          chat: input.chatId,
          from: input.from,
          message: input.message,
          read: false,
        },
      });
    }),

  createChat: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        vendorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      // Find out if chat exist
      const doesChatExist = await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
          vendor: {
            equals: input.vendorId,
          },
        },
      });

      if (doesChatExist.docs.length === 0) {
        await payload.create({
          collection: "chats",
          data: {
            user: input.userId,
            vendor: input.vendorId,
          },
        });

        const getChat = await payload.find({
          collection: "chats",
          where: {
            user: {
              equals: input.userId,
            },
            vendor: {
              equals: input.vendorId,
            },
          },
        });

        const user = getChat.docs[0].user as User;

        await payload.create({
          collection: "leads",
          data: {
            name: user.name,
            email: user.email,
            contact: "-",
            message: "-",
            source: "Sarang Sayang",
            status: "not contacted",
            priority: "high",
            remarks: "-",
            vendor: input.vendorId,
            chat: getChat.docs[0].id as string,
          },
        });
      }
    }),

  getAllChats: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });
    }),

  getVendorChats: publicProcedure
    .input(z.object({ vendorId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "chats",
        where: {
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  getChat: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  removeItinerary: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "itinerary",
        id: input.id,
      });
    }),

  editItinerary: publicProcedure
    .input(
      z.object({
        id: z.string(),
        time: z.number().optional(),
        date: z.string().optional(),
        location: z.string().optional(),
        event: z.string().optional(),
        involved: z.string().optional(),
        details: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.time) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            time: input.time,
          },
        });
      } else if (input.date) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            date: input.date,
          },
        });
      } else if (input.location) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            location: input.location,
          },
        });
      } else if (input.event) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            event: input.event,
          },
        });
      } else if (input.involved) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            involved: input.involved,
          },
        });
      } else if (input.details) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            details: input.details,
          },
        });
      }
    }),

  getItineraryByDate: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        date: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "itinerary",
        where: { plan: { equals: input.planId }, date: { equals: input.date } },
        pagination: false,
        sort: "time",
      });
    }),

  getItinerary: publicProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "itinerary",
        where: { plan: { equals: input.planId } },
        pagination: false,
        sort: "date",
      });

      let dates = [];

      for (let i = 0; i < results.docs.length; i++) {
        if (dates.length === 0) {
          dates.push(results.docs[i].date);
        } else if (dates.length > 0) {
          for (let i = 0; i < dates.length; i++) {
            if (dates[i] === dates[i + 1]) {
              dates.splice(i + 1, 1);
            }
          }
        }
      }

      return dates;
    }),

  addItinerary: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        date: z.string(),
        time: z.number(),
        location: z.string().optional(),
        event: z.string().optional(),
        involved: z.string().optional(),
        details: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "itinerary",
        data: {
          plan: input.planId,
          date: input.date,
          time: input.time,
          location: input.location || "-",
          event: input.event || "-",
          involved: input.involved || "-",
          details: input.details || "-",
        },
      });
    }),

  removeGuest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "guests",
        id: input.id,
      });
    }),

  editGuests: publicProcedure
    .input(
      z.object({
        id: z.string(),
        group: z.string().optional(),
        name: z.string().optional(),
        pax: z.number().optional(),
        attendance: z.string().optional(),
        sent: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.group) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            group: input.group,
          },
        });
      } else if (input.name) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            name: input.name,
          },
        });
      } else if (input.pax) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            pax: input.pax,
          },
        });
      } else if (input.attendance) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            attendance: input.attendance,
          },
        });
      } else if (input.sent === true || input.sent === false) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            sent: input.sent,
          },
        });
      }
    }),

  getGuests: publicProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "guests",
        where: { plan: { equals: input.planId } },
        pagination: false,
        sort: "createdAt",
      });
    }),

  addGuest: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        group: z.string(),
        name: z.string(),
        pax: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "guests",
        data: {
          plan: input.planId,
          group: input.group,
          name: input.name,
          pax: input.pax,
          attendance: "Waiting Confirmation",
          sent: false,
        },
      });
    }),

  removeBudget: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "budget",
        id: input.id,
      });
    }),

  editBudget: publicProcedure
    .input(
      z.object({
        id: z.string(),
        for: z.string().optional(),
        cat: z.string().optional(),
        details: z.string().optional(),
        plannedCost: z.number().optional(),
        actualCost: z.number().optional(),
        amountPaid: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.for) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            for: input.for,
          },
        });
      } else if (input.cat) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            cat: input.cat,
          },
        });
      } else if (input.details) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            details: input.details,
          },
        });
      } else if (input.plannedCost) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            plannedCost: input.plannedCost,
          },
        });
      } else if (input.actualCost) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            actualCost: input.actualCost,
          },
        });
      } else if (input.amountPaid) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            amountPaid: input.amountPaid,
          },
        });
      }
    }),

  addBudget: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        for: z.string(),
        cat: z.string(),
        details: z.string().optional(),
        plannedCost: z.number().optional(),
        actualCost: z.number().optional(),
        ver: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      let details = input.details;
      let plannedCost = input.plannedCost;
      let actualCost = input.actualCost;

      if (!input.details) {
        details = "-";
      }

      if (!input.plannedCost) {
        plannedCost = 0;
      }

      if (!input.actualCost) {
        actualCost = 0;
      }

      if (!input.ver) {
        await payload.create({
          collection: "budget",
          data: {
            plan: input.planId,
            for: input.for,
            cat: input.cat,
            details: details || "-",
            plannedCost: plannedCost,
            actualCost: actualCost,
            amountPaid: 0,
          },
        });
      } else {
        await payload.create({
          collection: "budget",
          data: {
            plan: input.planId,
            for: input.for,
            cat: input.cat,
            details: details || "-",
            plannedCost: plannedCost,
            actualCost: actualCost,
            amountPaid: 0,
            ver: input.ver,
          },
        });
      }
    }),

  getBudget: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        version: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.version && input.version === 1) {
        return await payload.find({
          collection: "budget",
          where: {
            plan: { equals: input.planId },
            and: [{ ver: { exists: false } }],
          },
          pagination: false,
          sort: "-plannedCost",
        });
      } else {
        return await payload.find({
          collection: "budget",
          where: {
            plan: { equals: input.planId },
            and: [{ ver: { equals: input.version } }],
          },
          pagination: false,
          sort: "-plannedCost",
        });
      }
    }),

  removeTodo: publicProcedure
    .input(
      z.object({
        todoId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "todos",
        id: input.todoId,
      });
    }),

  editTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        todo: z.string().optional(),
        date: z.string().optional(),
        check: z.boolean().optional(),
        remarks: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.todo) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            todo: input.todo,
          },
        });
      } else if (input.date) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            date: input.date,
          },
        });
      } else if (input.check === true || input.check === false) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            done: input.check,
          },
        });
      } else if (input.remarks) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            remarks: input.remarks,
          },
        });
      }
    }),

  getTodoByTodo: publicProcedure
    .input(
      z.object({
        todo: z.string(),
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "todos",
        where: { todo: { equals: input.todo }, plan: { equals: input.planId } },
        pagination: false,
        sort: "date",
      });
    }),

  getTodo: publicProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "todos",
        where: { plan: { equals: input.planId } },
        pagination: false,
        sort: "date",
      });
    }),

  addTodo: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        todo: z.string(),
        date: z.string(),
        remarks: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.remarks) {
        await payload.create({
          collection: "todos",
          data: {
            plan: input.planId,
            todo: input.todo,
            date: input.date,
            remarks: input.remarks,
            done: false,
          },
        });
      } else {
        await payload.create({
          collection: "todos",
          data: {
            plan: input.planId,
            todo: input.todo,
            date: input.date,
            done: false,
          },
        });
      }
    }),

  planRemovePackage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        packageId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const plan = await payload.find({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
      });

      const packages = plan.docs[0].packages as Package[];
      let packageIds = [];

      for (let i = 0; i < packages.length; i++) {
        if (packages[i].id !== input.packageId) {
          packageIds.push(packages[i].id);
        }
      }

      await payload.update({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
        data: {
          packages: packageIds,
        },
      });
    }),

  planAddPackage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        packageId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const plan = await payload.find({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
      });

      if (plan.docs[0].packages) {
        let packageIds = [];
        const packages = plan.docs[0].packages as Package[];
        for (let i = 0; i < packages.length; i++) {
          packageIds.push(packages[i].id);
        }
        packageIds.push(input.packageId);

        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            packages: packageIds,
          },
        });
      } else {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            packages: [input.packageId],
          },
        });
      }
    }),

  updatePlan: publicProcedure
    .input(
      z.object({
        id: z.string(),
        brideName: z.string().optional(),
        groomName: z.string().optional(),
        weddingDate: z.string().optional(),
        venue: z.string().optional(),
        agent: z.string().optional(),
        bridal: z.string().optional(),
        photovideo: z.string().optional(),
        mua: z.string().optional(),
        henna: z.string().optional(),
        emceesperformers: z.string().optional(),
        misc: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.brideName) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            brideName: input.brideName,
          },
        });
      } else if (input.groomName) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            groomName: input.groomName,
          },
        });
      } else if (input.weddingDate) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            weddingDate: input.weddingDate,
          },
        });
      } else if (input.venue) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            venue: input.venue,
          },
        });
      } else if (input.agent) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            agent: input.agent,
          },
        });
      } else if (input.bridal) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            bridal: input.bridal,
          },
        });
      } else if (input.photovideo) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            photovideo: input.photovideo,
          },
        });
      } else if (input.henna) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            henna: input.henna,
          },
        });
      } else if (input.mua) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            mua: input.mua,
          },
        });
      } else if (input.emceesperformers) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            emceesperformers: input.emceesperformers,
          },
        });
      } else if (input.misc) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            misc: input.misc,
          },
        });
      }
    }),

  createPlan: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "plans",
        data: {
          user: [input.userId],
        },
      });
    }),

  getPlan: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "plans",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });
    }),

  createPlanIfNil: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "plans",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });

      if (results.docs.length === 0) {
        await payload.create({
          collection: "plans",
          data: {
            user: [input.userId],
          },
        });
      }
    }),

  getEnquiries12M: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      const resultsArray = [];

      let currentEnqData = 0;
      let accuEnqData = 0;

      let currentSSData = 0;
      let accuSSData = 0;

      for (let i = 12; i > -1; i = i - 1) {
        let currentMonth = input.month - i;
        let currentYear = input.year;

        let followingMonth = currentMonth + 1;
        let followingYear = input.year;

        if (currentMonth === 0) {
          currentMonth = 12;
          currentYear = currentYear - 1;
        } else if (currentMonth < 0) {
          currentMonth = currentMonth + 12;
          currentYear = currentYear - 1;
          followingMonth = currentMonth + 1;
          followingYear = currentYear;
        }

        if (followingMonth > 12) {
          followingMonth = followingMonth - 12;
          followingYear = followingYear + 1;
        }

        const results1 = await payload.find({
          collection: "leads",
          where: {
            vendor: { equals: input.vendorId },
            createdAt: {
              greater_than_equal: new Date(
                `${currentYear}-${formatWithLeadingZero(
                  currentMonth
                )}-01T00:00:00Z`
              ),
              less_than: new Date(
                `${followingYear}-${formatWithLeadingZero(
                  followingMonth
                )}-01T00:00:00Z`
              ),
            },
          },
          pagination: false,
        });

        const results2 = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            source: { equals: "Sarang Sayang" },
            createdAt: {
              greater_than_equal: new Date(
                `${currentYear}-${formatWithLeadingZero(
                  currentMonth
                )}-01T00:00:00Z`
              ),
              less_than: new Date(
                `${followingYear}-${formatWithLeadingZero(
                  followingMonth
                )}-01T00:00:00Z`
              ),
            },
          },
          pagination: false,
        });

        currentEnqData = results1.docs.length - accuEnqData;
        currentSSData = results2.docs.length - accuSSData;

        accuEnqData = accuEnqData + currentEnqData;
        accuSSData = accuSSData + currentSSData;

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: currentEnqData,
          ss: currentSSData,
        });
      }

      return resultsArray;
    }),

  getVendorLikes12M: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      const resultsArray = [];
      let currentData = 0;
      let accuData = 0;

      for (let i = 12; i > -1; i = i - 1) {
        let currentMonth = input.month - i;
        let currentYear = input.year;

        let followingMonth = currentMonth + 1;
        let followingYear = input.year;

        if (currentMonth === 0) {
          currentMonth = 12;
          currentYear = currentYear - 1;
        } else if (currentMonth < 0) {
          currentMonth = currentMonth + 12;
          currentYear = currentYear - 1;
          followingMonth = currentMonth + 1;
          followingYear = currentYear;
        }

        if (followingMonth > 12) {
          followingMonth = followingMonth - 12;
          followingYear = followingYear + 1;
        }

        const results = await payload.find({
          collection: "likesArchive",
          where: {
            vendor: { equals: input.vendorId },
            createdAt: {
              greater_than_equal: new Date(
                `${currentYear}-${formatWithLeadingZero(
                  currentMonth
                )}-01T00:00:00Z`
              ),
              less_than: new Date(
                `${followingYear}-${formatWithLeadingZero(
                  followingMonth
                )}-01T00:00:00Z`
              ),
            },
          },
          pagination: false,
        });

        currentData = results.docs.length - accuData;
        accuData = accuData + currentData;

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: currentData,
        });
      }

      console.log(resultsArray);
      return resultsArray;
    }),

  getSSLeadsThisMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const ltDate =
        input.month === 12
          ? new Date(`${input.year + 1}-01-01T00:00:00Z`)
          : new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`);
      return await payload.find({
        collection: "leads",
        where: {
          vendor: { equals: input.vendorId },
          source: { equals: "Sarang Sayang" },
          createdAt: {
            greater_than_equal: new Date(
              `${input.year}-${input.month}-01T00:00:00Z`
            ),
            less_than: ltDate,
          },
        },
        pagination: false,
      });
    }),

  getVendorLikesThisMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const ltDate =
        input.month === 12
          ? new Date(`${input.year + 1}-01-01T00:00:00Z`)
          : new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`);
      return await payload.find({
        collection: "likes",
        where: {
          vendor: { equals: input.vendorId },
          createdAt: {
            greater_than_equal: new Date(
              `${input.year}-${input.month}-01T00:00:00Z`
            ),
            less_than: ltDate,
          },
        },
        pagination: false,
      });
    }),

  getEnquiriesThisMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const ltDate =
        input.month === 12
          ? new Date(`${input.year + 1}-01-01T00:00:00Z`)
          : new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`);
      return await payload.find({
        collection: "leads",
        where: {
          vendorId: { equals: input.vendorId },
          createdAt: {
            greater_than_equal: new Date(
              `${input.year}-${input.month}-01T00:00:00Z`
            ),
            less_than: ltDate,
          },
        },
        pagination: false,
      });
    }),

  getVendUser: publicProcedure
    .input(
      z.object({
        vendUserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "vendors",
        where: {
          venduserid: {
            equals: input.vendUserId,
          },
        },
        limit: 1,
      });
    }),

  getVendorId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "vendors",
        where: {
          venduserid: {
            equals: input.userId,
          },
        },
        pagination: false,
      });
    }),

  getLeads: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
        sort: z.string().optional(),
        high: z.boolean(),
        medium: z.boolean(),
        low: z.boolean(),
        cs: z.boolean(),
        ni: z.boolean(),
        lnr: z.boolean(),
        cold: z.boolean(),
        hot: z.boolean(),
        warm: z.boolean(),
        nc: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      let results = [];

      if (!input.sort) {
        const { docs: preResults } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let x = 0; x < preResults.length; x++) {
          results.push(preResults[x]);
        }
      } else if (input.sort === "source") {
        const { docs: preResults } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
          },
          pagination: false,
          sort: "source",
        });

        for (let x = 0; x < preResults.length; x++) {
          results.push(preResults[x]);
        }
      } else if (input.sort === "priority") {
        const { docs: high } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                priority: { equals: "high" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let h = 0; h < high.length; h++) {
          results.push(high[h]);
        }

        const { docs: medium } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                priority: { equals: "medium" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let m = 0; m < medium.length; m++) {
          results.push(medium[m]);
        }

        const { docs: low } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                priority: { equals: "low" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let l = 0; l < low.length; l++) {
          results.push(low[l]);
        }
      } else if (input.sort === "status") {
        const { docs: cs } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                status: { equals: "contract signed" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let a = 0; a < cs.length; a++) {
          results.push(cs[a]);
        }

        const { docs: ni } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                status: { equals: "not interested" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let a = 0; a < ni.length; a++) {
          results.push(ni[a]);
        }

        const { docs: lnr } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                status: { equals: "lnr" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let a = 0; a < lnr.length; a++) {
          results.push(lnr[a]);
        }

        const { docs: cold } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                status: { equals: "cold" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let a = 0; a < cold.length; a++) {
          results.push(cold[a]);
        }

        const { docs: hot } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                status: { equals: "hot" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let a = 0; a < hot.length; a++) {
          results.push(hot[a]);
        }

        const { docs: warm } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                status: { equals: "warm" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let a = 0; a < warm.length; a++) {
          results.push(warm[a]);
        }

        const { docs: nc } = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            and: [
              {
                status: { equals: "not contacted" },
              },
            ],
          },
          pagination: false,
          sort: "-createdAt",
        });

        for (let a = 0; a < nc.length; a++) {
          results.push(nc[a]);
        }
      }

      let endResults: any[] | PromiseLike<any[]> = [];
      let tweaked = false;

      if (input.high === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].priority != "high") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].priority != "high") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }

      if (input.medium === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].priority != "medium") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].priority != "medium") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.low === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].priority != "low") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].priority != "low") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.cs === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].status != "contract signed") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].status != "contract signed") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.ni === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].status != "not interested") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].status != "not interested") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.lnr === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].status != "lnr") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].status != "lnr") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.cold === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].status != "cold") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].status != "cold") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.hot === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].status != "hot") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].status != "hot") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.warm === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].status != "warm") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].status != "warm") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }
      if (input.nc === false) {
        if (!tweaked) {
          for (let a = 0; a < results.length; a++) {
            if (results[a].status != "not contacted") {
              endResults.push(results[a]);
              tweaked = true;
            }
          }
        } else {
          let current = [];
          for (let a = 0; a < endResults.length; a++) {
            if (endResults[a].status != "not contacted") {
              current.push(endResults[a]);
            }
          }

          endResults = [];

          for (let a = 0; a < current.length; a++) {
            endResults.push(current[a]);
          }
        }
      }

      if (!tweaked) {
        return results;
      } else {
        return endResults;
      }
    }),

  getSSLeads: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "leads",
        where: {
          vendor: {
            equals: input.vendorId,
          },
          source: {
            equals: "Sarang Sayang",
          },
        },
        pagination: false,
      });
    }),

  addLead: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        contact: z.string(),
        message: z.string(),
        source: z.string(),
        status: z.string(),
        priority: z.string(),
        remarks: z.string(),
        vendorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "leads",
        data: {
          name: input.name,
          email: input.email,
          contact: input.contact,
          message: input.message,
          source: input.source,
          status: input.status,
          priority: input.priority,
          remarks: input.remarks,
          vendor: input.vendorId,
        },
      });
    }),

  removeLead: publicProcedure
    .input(
      z.object({
        leadId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "leads",
        id: input.leadId,
      });
    }),

  getLead: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "leads",
        where: {
          id: {
            equals: input.id,
          },
        },
        limit: 1,
      });
    }),

  updateLead: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        contact: z.string(),
        source: z.string(),
        status: z.string(),
        priority: z.string(),
        remarks: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "leads",
        where: {
          id: { equals: input.id },
        },
        data: {
          updatedAt: new Date().toISOString(),
          name: input.name,
          email: input.email,
          contact: input.contact,
          source: input.source,
          status: input.status,
          priority: input.priority,
          remarks: input.remarks,
        },
      });
    }),

  getVendor: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "vendors",
        where: {
          id: {
            equals: input.id,
          },
        },
        limit: 1,
      });
    }),

  getLikes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "likes",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });
    }),

  getLikesFromVendId: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "likes",
        where: {
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  isLiked: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "likes",
        where: {
          user: {
            equals: input.userId,
          },
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  transferAllLikes: publicProcedure
    .input(
      z.object({
        blank: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const allVendors = await payload.find({
        collection: "vendors",
        pagination: false,
      });

      console.log("We have collated all vendors. We are doing it now");

      for (let i = 0; i < allVendors.docs.length; i++) {
        const initLikes = await payload.find({
          collection: "likes",
          where: {
            vendor: { equals: allVendors.docs[i].id },
          },
          pagination: false,
        });

        console.log("We are on: " + allVendors.docs[i].name);

        await payload.update({
          collection: "vendors",
          where: {
            id: { equals: allVendors.docs[i].id },
          },
          data: {
            likes: initLikes.docs.length,
          },
        });
      }

      console.log("Alhamdulillah we are done. We are going home.");
    }),

  addLike: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "likes",
        data: {
          vendor: input.vendorId,
          user: input.userId,
        },
      });

      const vendor = await payload.find({
        collection: "vendors",
        where: {
          id: { equals: input.vendorId },
          and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
        },
        pagination: false,
      });

      if (vendor.docs[0].likes) {
        await payload.update({
          collection: "vendors",
          where: {
            id: { equals: input.vendorId },
          },
          data: {
            likes: (vendor.docs[0].likes as number) + 1,
          },
        });
      } else {
        await payload.update({
          collection: "vendors",
          where: {
            id: { equals: input.vendorId },
          },
          data: {
            likes: 1,
          },
        });
      }

      const alreadyLikedBefore = await payload.find({
        collection: "likesArchive",
        where: {
          vendor: { equals: input.vendorId },
          user: { equals: input.userId },
        },
      });

      if (alreadyLikedBefore.docs.length === 0) {
        await payload.create({
          collection: "likesArchive",
          data: {
            vendor: input.vendorId,
            user: input.userId,
          },
        });
      }
    }),

  removeLike: publicProcedure
    .input(
      z.object({
        likeId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "likes",
        id: input.likeId,
      });
    }),

  getTopVendor: publicProcedure
    .input(
      z.object({
        category: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "featured",
        where: {
          id: { equals: "65a3e090f66a58e7b5eb9542" },
        },
      });

      if (input.category === "venues") {
        return {
          top: results.docs[0].top1Venue,
          top4: results.docs[0].top4Venues,
        };
      } else if (input.category === "stylist") {
        return {
          top: results.docs[0].top1Stylist,
          top4: results.docs[0].top4Stylist,
        };
      } else if (input.category === "packages") {
        return {
          top: results.docs[0].top1Packages,
          top4: results.docs[0].top4Packages,
        };
      } else if (input.category === "bridals") {
        return {
          top: results.docs[0].top1Bridal,
          top4: results.docs[0].top4Bridals,
        };
      } else if (input.category === "photovideo") {
        return {
          top: results.docs[0].top1Photovideo,
          top4: results.docs[0].top4Photovideo,
        };
      } else if (input.category === "coordinators") {
        return {
          top: results.docs[0].top1Coordinator,
          top4: results.docs[0].top4Coordinator,
        };
      } else if (input.category === "mua") {
        return {
          top: results.docs[0].top1Mua,
          top4: results.docs[0].top4Mua,
        };
      } else if (input.category === "berkat") {
        return {
          top: results.docs[0].top1Berkat,
          top4: results.docs[0].top4Berkat,
        };
      } else if (input.category === "pakandam") {
        return {
          top: results.docs[0].top1Pakandam,
          top4: results.docs[0].top4Pakandam,
        };
      } else if (input.category === "dulang") {
        return {
          top: results.docs[0].top1Dulang,
          top4: results.docs[0].top4Dulang,
        };
      } else if (input.category === "live") {
        return {
          top: results.docs[0].top1Live,
          top4: results.docs[0].top4Live,
        };
      } else if (input.category === "henna") {
        return {
          top: results.docs[0].top1Henna,
          top4: results.docs[0].top4Henna,
        };
      } else if (input.category === "emcees") {
        return {
          top: results.docs[0].top1Emcee,
          top4: results.docs[0].top4Emcees,
        };
      } else if (input.category === "performers") {
        return {
          top: results.docs[0].top1Performers,
          top4: results.docs[0].top4Performers,
        };
      } else if (input.category === "prep") {
        return {
          top: results.docs[0].top1Prep,
          top4: results.docs[0].top4Prep,
        };
      } else if (input.category === "stationery") {
        return {
          top: results.docs[0].top1Stationery,
          top4: results.docs[0].top4Stationery,
        };
      } else if (input.category === "cake") {
        return {
          top: results.docs[0].top1Cake,
          top4: results.docs[0].top4Cake,
        };
      } else if (input.category === "catering") {
        return {
          top: results.docs[0].top1Catering,
          top4: results.docs[0].top4Catering,
        };
      }
    }),

  setHomepageVendor: publicProcedure
    .input(z.object({ slot: z.number(), vendorId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.slot == 1) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot1: input.vendorId,
          },
        });
      } else if (input.slot == 2) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot2: input.vendorId,
          },
        });
      } else if (input.slot == 3) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot3: input.vendorId,
          },
        });
      } else if (input.slot == 4) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot4: input.vendorId,
          },
        });
      } else if (input.slot == 5) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot5: input.vendorId,
          },
        });
      } else if (input.slot == 6) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot6: input.vendorId,
          },
        });
      } else if (input.slot == 7) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot7: input.vendorId,
          },
        });
      } else if (input.slot == 8) {
        await payload.update({
          collection: "homepage",
          where: {
            id: { equals: "6731fa30466109cc5693fa69" },
          },
          data: {
            slot8: input.vendorId,
          },
        });
      }
    }),

  setTopVendors: publicProcedure
    .input(z.object({ cat: z.string(), vendorId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.cat == "venues") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Venue: input.vendorId,
          },
        });
      } else if (input.cat == "coordinators") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Coordinator: input.vendorId,
          },
        });
      } else if (input.cat == "stylist") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Stylist: input.vendorId,
          },
        });
      } else if (input.cat == "photovideo") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Photovideo: input.vendorId,
          },
        });
      } else if (input.cat == "bridals") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Bridal: input.vendorId,
          },
        });
      } else if (input.cat == "mua") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Mua: input.vendorId,
          },
        });
      } else if (input.cat == "pakandam") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Pakandam: input.vendorId,
          },
        });
      } else if (input.cat == "berkat") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Berkat: input.vendorId,
          },
        });
      } else if (input.cat == "dulang") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Dulang: input.vendorId,
          },
        });
      } else if (input.cat == "live") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Live: input.vendorId,
          },
        });
      } else if (input.cat == "henna") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Henna: input.vendorId,
          },
        });
      } else if (input.cat == "emcees") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Emcee: input.vendorId,
          },
        });
      } else if (input.cat == "performers") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Performers: input.vendorId,
          },
        });
      } else if (input.cat == "prep") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Prep: input.vendorId,
          },
        });
      } else if (input.cat == "stationery") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Stationery: input.vendorId,
          },
        });
      } else if (input.cat == "cake") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Cake: input.vendorId,
          },
        });
      } else if (input.cat == "catering") {
        await payload.update({
          collection: "featured",
          where: {
            id: { equals: "65a3e090f66a58e7b5eb9542" },
          },
          data: {
            top1Catering: input.vendorId,
          },
        });
      }
    }),

  getSlotVendor: publicProcedure.query(async () => {
    const payload = await getPayloadClient();

    const { docs: vendor } = await payload.find({
      collection: "homepage",
      where: {
        id: { equals: "6731fa30466109cc5693fa69" },
      },
      pagination: false,
    });

    return vendor;
  }),

  getPagelessInfiniteProducts: publicProcedure
    .input(z.object({ cat: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const { docs: items } = await payload.find({
        collection: "vendors",
        where: {
          category: { equals: input.cat },
          and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
        },
        pagination: false,
      });

      return items;
    }),

  getAllPagelessInfiniteProducts: publicProcedure.query(async ({ input }) => {
    const payload = await getPayloadClient();

    const { docs: items } = await payload.find({
      collection: "vendors",
      pagination: false,
      where: {
        venduserid: { not_in: "658fdba885aa3665781e567a" },
      },
    });

    return items;
  }),

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(1000),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<
        string,
        { equals?: string; contains?: string }
      > = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        if (key === "search") {
          parsedQueryOpts["name"] = {
            contains: value,
          };
        } else {
          parsedQueryOpts[key] = {
            equals: value,
          };
        }
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "vendors",
        where: {
          ...parsedQueryOpts,
          and: [
            {
              venduserid: {
                not_in: [
                  "658fdba885aa3665781e567a",
                  "65d23bde3d200459cb8a58b2",
                ],
              },
            },
          ],
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
