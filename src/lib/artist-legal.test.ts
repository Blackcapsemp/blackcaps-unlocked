import { describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { canRequestPublication, hasAuthorization, LEGAL_VERSION, type Authorization } from "./artist-legal";
const record = (state: string, created_at: string, kind = "publication"): Authorization => ({ id: created_at, user_id: "owner", artist_profile_id: null, recorded_by: "owner", kind, version: LEGAL_VERSION, accepted_text: "accepted", state, source: "artist", document_reference: null, created_at });
describe("artist authorization rules", () => {
  it("requires both terms and separate publication authorization", () => {
    expect(canRequestPublication(false, true)).toBe(false);
    expect(canRequestPublication(true, false)).toBe(false);
    expect(canRequestPublication(true, true)).toBe(true);
  });
  it("never presumes historical authorization", () => { expect(hasAuthorization([], "publication")).toBe(false); });
  it("withdrawal supersedes an earlier acceptance", () => {
    expect(hasAuthorization([record("active", "2026-11-07T10:00:00Z"), record("withdrawn", "2026-11-07T11:00:00Z")], "publication")).toBe(false);
  });
  it("terms never substitute for publication authorization", () => { expect(hasAuthorization([record("active", "2026-11-07T10:00:00Z", "terms")], "publication")).toBe(false); });
  it("a fresh express authorization restores the active state", () => {
    expect(hasAuthorization([record("active", "2026-11-07T12:00:00Z"), record("withdrawn", "2026-11-07T11:00:00Z")], "publication")).toBe(true);
  });
});