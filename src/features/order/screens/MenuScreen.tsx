import { Badge, Button, Eyebrow, Landscape, Logo, SlotImage, Tabs } from "@/components/ds";
import { CATALOG, CATEGORIES, getItem, HERO_ITEM_ID, HERO_SLOT, usualSlot } from "../catalog";
import { optionText, toGoText } from "../copy";
import type { OrderModel } from "../model";
import { isOneAway, pointsFill, quickOptions, REWARD_POINTS } from "../pricing";
import { BasketLines } from "./parts";
import styles from "./MenuScreen.module.css";
import ui from "./screens.module.css";

type MenuScreenProps = {
  model: OrderModel;
  onAddUsual: () => void;
};

export function MenuScreen({ model, onAddUsual }: MenuScreenProps) {
  const { lang, t, tc, state, dispatch, totals, known } = model;
  const { usual, points, basket } = state;
  const hero = getItem(HERO_ITEM_ID);

  return (
    <div className={styles.screen}>
      <div className={ui.intro}>
        <Eyebrow>{known ? t.stepMenuKnown : t.stepMenu}</Eyebrow>
        <h1 className={styles.menuTitle}>{t.menuTitle}</h1>
        <p className={ui.lead}>{t.menuLead}</p>
      </div>

      {usual && (
        <div className={styles.usual}>
          <Landscape crop="wavesEnd" color="var(--ink-700)" fit="contain" className={styles.usualArt} />
          <div className={styles.usualTop}>
            <div className={styles.usualThumb}>
              <SlotImage id={usualSlot(usual.id)} alt={t.names[usual.id]} />
            </div>
            <div className={styles.usualText}>
              <Eyebrow tone="cream" className={styles.usualLabel}>
                {t.usualLabel}
              </Eyebrow>
              <span className={styles.usualName}>{t.names[usual.id]}</span>
              <span className={styles.usualOptions}>{optionText(usual, t, lang)}</span>
              {known && <span className={styles.usualHint}>{t.usualOneTap}</span>}
            </div>
          </div>
          <Button variant="onBrand" size="md" block className={styles.usualButton} onClick={onAddUsual}>
            {known ? t.usualAgain : t.addUsual}
          </Button>
        </div>
      )}

      <div className={styles.points}>
        <div className={styles.pointsBody}>
          <div className={styles.pointsHead}>
            <div className={styles.pointsHeadText}>
              <Eyebrow className={styles.cardEyebrow}>{t.cardLabel}</Eyebrow>
              <span className={styles.cardTitle}>{t.cardTitle}</span>
              <span className={styles.note}>{t.cardHow}</span>
            </div>
            <div className={styles.badges}>{points >= REWARD_POINTS && <Badge tone="solid">{t.cardFreeReady}</Badge>}</div>
          </div>
          <div className={styles.meter}>
            <div className={styles.track}>
              <div className={styles.fill} style={{ width: pointsFill(points) }} />
            </div>
            <span className={styles.pointsNow}>
              {points} {t.cardOf}
            </span>
            <span className={styles.toGo}>{toGoText(points, t, lang)}</span>
            {totals.cups > 0 && (
              <span className={styles.thisOrder}>
                <span>{t.cardThisOrder}</span>
                <span>+{totals.earned}</span>
              </span>
            )}
          </div>
          {isOneAway(points, totals.earned, basket) && <span className={styles.nudge}>{t.cardNudge}</span>}
        </div>
        {/* The cover in miniature: the sunset, the logo, Jazan's mountains and sea in cream line. */}
        <div aria-hidden="true" className={styles.scene}>
          <Logo color="cream" height={46} className={styles.sceneLogo} />
          <Landscape crop="full" className={styles.sceneArt} />
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroMedia}>
          <SlotImage id={HERO_SLOT} alt={`${t.photoOf} ${t.names[hero.id]}`} />
          <div className={styles.heroBadge}>
            <Badge tone="solid">{t.heroEyebrow}</Badge>
          </div>
        </div>
        <div className={styles.heroBody}>
          <h2 className={styles.heroName}>{t.names[hero.id]}</h2>
          <span className={styles.heroNote}>{t.notes[hero.id]}</span>
          <span className={ui.eyebrow}>{t.heroProof}</span>
          <div className={styles.heroBuy}>
            <span className={ui.priceLarge}>
              {hero.price}
              <span className={ui.currency}>{tc.currency}</span>
            </span>
            <Button
              variant="primary"
              size="md"
              block
              onClick={() => dispatch({ type: "addLine", id: hero.id, options: quickOptions(hero) })}
            >
              {t.add}
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        items={CATEGORIES.map((value) => ({ value, label: t.cats[value] }))}
        value={state.cat}
        onChange={(cat) => dispatch({ type: "set", patch: { cat } })}
      />

      <div className={styles.items}>
        {CATALOG[state.cat].map((item) => {
          const name = t.names[item.id];
          // Tapping the photo or the text opens the customise sheet (beans go straight in).
          const customise = () => dispatch({ type: "openSheet", id: item.id });
          return (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemThumb} onClick={customise}>
                <SlotImage id={item.slot} alt={name} />
              </div>
              <div className={styles.itemText} onClick={customise}>
                <div className={styles.itemNameRow}>
                  <span className={styles.itemName}>{name}</span>
                  {(item.badge || item.limited) && (
                    <Badge tone={item.limited ? "coral" : "sunset"}>{item.badge ? t.badgeMost : t.badgeLimited}</Badge>
                  )}
                </div>
                <span className={styles.note}>{t.notes[item.id]}</span>
                <span className={ui.eyebrow}>{t.customise}</span>
              </div>
              <div className={styles.itemBuy}>
                <span className={styles.itemPrice}>
                  {item.price}
                  <span className={styles.itemCurrency}>{tc.currency}</span>
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => dispatch({ type: "addLine", id: item.id, options: quickOptions(item) })}
                >
                  {t.add}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {basket.length > 0 && (
        <div className={styles.basket}>
          <span className={styles.basketLabel}>{t.basketLabel}</span>
          <BasketLines model={model} />
        </div>
      )}
    </div>
  );
}
