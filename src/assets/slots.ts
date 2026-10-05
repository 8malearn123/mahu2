// Photos the designer dropped into the export's image slots, keyed by slot id.
import branchAbuarish from "./slots/branch-abuarish.webp";
import branchCorniche from "./slots/branch-corniche.webp";
import branchPrince from "./slots/branch-prince.webp";
import branchSabya from "./slots/branch-sabya.webp";
import drinkBatch from "./slots/drink-batch.webp";
import drinkMahuLatte from "./slots/drink-mahu-latte.webp";
import featColdBrew from "./slots/feat-cold-brew.webp";
import featMahuLatte from "./slots/feat-mahu-latte.webp";
import featOrangeCoffee from "./slots/feat-orange-coffee.webp";
import heroMahuLatte from "./slots/hero-mahu-latte.webp";
import itemBatch from "./slots/item-batch.webp";
import itemBeans from "./slots/item-beans.webp";
import itemCortado from "./slots/item-cortado.webp";
import itemFlatWhite from "./slots/item-flat-white.webp";
import itemIcedSpanish from "./slots/item-iced-spanish.webp";
import itemMatcha from "./slots/item-matcha.webp";
import itemSpanishLatte from "./slots/item-spanish-latte.webp";
import itemV60 from "./slots/item-v60.webp";
import jobsCupHandoff from "./slots/jobs-cup-handoff.webp";
import jobsHandsMachine from "./slots/jobs-hands-machine.webp";
import jobsWindowTeam from "./slots/jobs-window-team.webp";

export const slotImages = {
  "branch-abuarish": branchAbuarish,
  "branch-corniche": branchCorniche,
  "branch-prince": branchPrince,
  "branch-sabya": branchSabya,
  "drink-batch": drinkBatch,
  "drink-mahu-latte": drinkMahuLatte,
  "feat-cold-brew": featColdBrew,
  "feat-mahu-latte": featMahuLatte,
  "feat-orange-coffee": featOrangeCoffee,
  "hero-mahu-latte": heroMahuLatte,
  "item-batch": itemBatch,
  "item-beans": itemBeans,
  "item-cortado": itemCortado,
  "item-flat-white": itemFlatWhite,
  "item-iced-spanish": itemIcedSpanish,
  "item-matcha": itemMatcha,
  "item-spanish-latte": itemSpanishLatte,
  "item-v60": itemV60,
  "jobs-cup-handoff": jobsCupHandoff,
  "jobs-hands-machine": jobsHandsMachine,
  "jobs-window-team": jobsWindowTeam,
} as const;

export type SlotId = keyof typeof slotImages;
