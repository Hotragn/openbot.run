import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ATTACHMENT_LIMITS } from "@openbot/contracts/input-limits";
import { afterEach, expect, it } from "vitest";
import { runCauseEffect } from "../backend/effect-boundary";
import { localFilePreview } from "./file-preview";

let root = "";

afterEach(async () => {
  if (root) await rm(root, { recursive: true, force: true });
  root = "";
});

it("opens a local file over the preview limit with no preview instead of failing", async () => {
  root = await mkdtemp(join(tmpdir(), "openbot-file-preview-"));
  const path = join(root, "report.pdf");
  await writeFile(path, "%PDF-1.7");

  const preview = await runCauseEffect(localFilePreview(path, "report.pdf", ATTACHMENT_LIMITS.fileBytes + 1, 0));

  expect(preview).toMatchObject({ name: "report.pdf", previewKind: "none", bytes: null });
});
