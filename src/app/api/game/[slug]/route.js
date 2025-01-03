import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Mock veri
    const mockGame = {
      title: {
        tr: "World of Tanks Blitz",
        en: "World of Tanks Blitz",
      },
      description: {
        tr: "Efsanevi tank savaş oyunu World of Tanks Blitz'de savaş meydanlarında hakimiyet kurun!",
        en: "Dominate the battlefields in the legendary tank battle game World of Tanks Blitz!",
      },
      keywords: {
        tr: ["tank", "savaş", "strateji", "aksiyon"],
        en: ["tank", "war", "strategy", "action"],
      },
      categories: [
        {
          _id: "1",
          name: "Strategy",
        },
        {
          _id: "2",
          name: "Action",
        },
      ],
      instantLink:
        "https://ud-gles3games.kvm-fsn1.k8s.n2i.io/?deeplinksApp=net.wargaming.wot.blitz&deeplinksURI=null%3A%2F%2F&naturalOrientation=landscape&forcedNaturalOrientation&autofitOnConnect&compressUp=true&quotaBytes=4000000&quotaMinSwaps=4&maxSize=1280&backOnDisconnected=true&disconnectedMessage=null&api=%7B%22back%22%3Afalse%7D&title=WoT+Blitz",
      playCount: 5678,
      image: "https://picsum.photos/800/600",
    };

    return NextResponse.json(mockGame);
  } catch (error) {
    console.error("Error in games API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
