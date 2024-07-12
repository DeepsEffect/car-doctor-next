"use client";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SocialLogin = () => {
  const router = useRouter();
  const session = useSession()
  const handleSocialLogin = async (provider) => {
    const res = await signIn(provider, {redirect: false})
  };
  if(session.status === 'authenticated'){
    router.push('/')
  }
  return (
    <div className="flex gap-4 justify-center">
      <Button
        onClick={() => handleSocialLogin("google")}
        color="warning"
        className="font-bold text-white"
      >
        Google
      </Button>
      <Button
        onClick={() => handleSocialLogin("github")}
        color="secondary"
        className="font-bold text-white"
      >
        GitHub
      </Button>
    </div>
  );
};

export default SocialLogin;
