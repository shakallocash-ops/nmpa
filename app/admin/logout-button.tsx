"use client";

import { logoutAndRedirect } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAndRedirect}>
      <Button type="submit" variant="outline" size="sm">
        Logout
      </Button>
    </form>
  );
}
