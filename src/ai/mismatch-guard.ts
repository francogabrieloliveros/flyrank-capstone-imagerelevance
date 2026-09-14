type GuardResult = "accepted" | "rejected" | "no_match";

interface GuardInput {
  postExpectedCategory: string | null;
  imageCategory: string;
  imageConfidence: number;
  imageFlagged: boolean;
  similarity: number;
  threshold?: number;
}

export interface GuardOutput {
  result: GuardResult;
  reason: string;
}

export const mismatchGuard = ({
  postExpectedCategory,
  imageCategory,
  imageConfidence,
  imageFlagged,
  similarity,
  threshold = 0.55,
}: GuardInput): GuardOutput => {
  if (imageFlagged || imageConfidence < 0.6) {
    return {
      result: "rejected",
      reason: "Low-confidence classification, not trusted for matching.",
    };
  } else if (
    postExpectedCategory !== null &&
    postExpectedCategory !== imageCategory
  ) {
    return {
      result: "rejected",
      reason: `Category mismatch: expected ${postExpectedCategory}, detected ${imageCategory}.`,
    };
  } else if (similarity < threshold) {
    return {
      result: "no_match",
      reason: "Best candidate similarity below threshold — no confident match.",
    };
  } else {
    return {
      result: "accepted",
      reason: `Category "${imageCategory}" matched with similarity ${similarity}.`,
    };
  }
};
