import { Bot } from "gramio";

const bot = new Bot(process.env.BOT_TOKEN as string)
  .command("start", (context) => context.send("Hello from GramIO on Vercel!"));

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Process the incoming update payload from Telegram
    await bot.handleUpdate(req.body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
