"use client";
import React, { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

type Props = {};
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};
type Providers = Record<string, Provider>;

export default function AuthProviders({}: Props) {
  const [providers, setProviders] = useState<Providers | null>(null);

  const fetchProviders = async () => {
    const res = await getProviders();
    console.log("providers  res", res);

    setProviders(res);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  if (providers) {
    return Object.values(providers).map((provider: Provider, index: number) => {
      return (
        <button
          key={index}
          onClick={() => {
            signIn(provider?.id);
          }}
        >
          {provider.id}
        </button>
      );
    });
  }

  return <div></div>;
}
