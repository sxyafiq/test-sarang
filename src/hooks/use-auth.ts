import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error();

      toast({
        title: "Come back soon, yeah?",
        description: "Signed out successfully",
      });

      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      toast({
        title: "Hmm weird..",
        description: "Couldn't sign you out, please try again.",
        variant: "destructive",
      });
    }
  };

  return { signOut };
};
