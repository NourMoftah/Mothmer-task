import { NextResponse } from "next/server";

import { mothmerApi } from "@/lib/api/mothmer";

type Action = "like" | "favorite" | "view";

export async function POST(_: Request, { params }: { params: Promise<{ id: string; action: string }> }) {
  const { id, action } = await params;

  if (action !== "like" && action !== "favorite" && action !== "view") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  try {
    const request: Record<Action, () => Promise<unknown>> = {
      like: () => mothmerApi.likeAdvertisement(id),
      favorite: () => mothmerApi.favoriteAdvertisement(id),
      view: () => mothmerApi.recordAdvertisementView(id),
    };
    const result = await request[action]();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: "Request failed" }, { status: 502 });
  }
}
