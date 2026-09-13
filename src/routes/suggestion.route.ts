import { Router } from "express";
import validate from "@/middleware/validate";
import { suggestionSchema } from "@/models/suggestion.model";
import {
  approveSuggestion,
  getSuggestion,
  rejectSuggestion,
} from "@/controllers/suggestion.controller";

const suggestionRouter = Router();

suggestionRouter.get("/:id", validate(suggestionSchema), getSuggestion);
suggestionRouter.patch(
  "/:id/approve",
  validate(suggestionSchema),
  approveSuggestion,
);
suggestionRouter.patch(
  "/:id/reject",
  validate(suggestionSchema),
  rejectSuggestion,
);

export default suggestionRouter;
