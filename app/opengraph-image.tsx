import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Tomi the Tiger — picture books for ages 3–6 by April Summers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const hero = await readFile(
    join(process.cwd(), "public/images/tomi-hero.jpg"),
  );
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "linear-gradient(135deg, #eef6f0 0%, #f7f0e4 55%, #f3ead8 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 560,
            paddingRight: 40,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#2c2825",
              letterSpacing: "-0.02em",
            }}
          >
            Big feelings.
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#c4672a",
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            Little tiger.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: "#5a534c",
            }}
          >
            Join Tomi on seven heart-warming jungle adventures about
            friendship, bravery and trying again — picture books for ages
            3–6.
          </div>
          <div
            style={{
              fontSize: 22,
              marginTop: 20,
              color: "#8b6914",
              fontWeight: 700,
            }}
          >
            by April Summers
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 420,
            height: 420,
            borderRadius: "9999px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(44, 40, 37, 0.18)",
            border: "8px solid rgba(255, 255, 255, 0.85)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt=""
            width={420}
            height={420}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
