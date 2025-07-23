"use client";

import { use } from "react";
import CountryPage from "@/components/CountryPage";

interface CountryPageRouteProps {
  params: Promise<{
    country: string;
  }>;
}

export default function CountryPageRoute({ params }: CountryPageRouteProps) {
  // Unwrap the params promise using React.use()
  const { country } = use(params);
  
  return <CountryPage countrySlug={country} />;
}