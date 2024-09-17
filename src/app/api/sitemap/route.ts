import { NextResponse } from "next/server";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export async function GET() {
  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: "https://www.findpapers.click/",
  });

  // Add your pages to the sitemap
  stream.write({ url: "/", changefreq: "daily", priority: 0.9 });
  stream.write({ url: "/about", changefreq: "monthly", priority: 0.8 });
  // Add more pages as needed

  // End the stream
  stream.end();

  // Generate sitemap XML
  const sitemapOutput = await streamToPromise(stream);

  // Return the XML with the correct headers
  return new NextResponse(sitemapOutput, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
