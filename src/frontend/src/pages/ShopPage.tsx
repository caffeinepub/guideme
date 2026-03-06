import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useConfetti } from "../components/Confetti";
import {
  addOwnedItem,
  equipItem,
  loadProgress,
  spendCoins,
  spendGems,
} from "../utils/progressStore";

// ─── Shop Item Definitions ────────────────────────────────────────────────────

type Currency = "coins" | "gems";
type SlotType = "background" | "pet" | "effect" | "accessory";

interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  cost: number;
  currency: Currency;
  slot: SlotType;
}

const BACKGROUNDS: ShopItem[] = [
  {
    id: "bg_galaxy",
    name: "Galaxy Theme",
    emoji: "🌌",
    description: "Swirling galaxies and nebulas",
    cost: 200,
    currency: "coins",
    slot: "background",
  },
  {
    id: "bg_ocean",
    name: "Ocean Deep",
    emoji: "🌊",
    description: "Deep blue ocean vibes",
    cost: 150,
    currency: "coins",
    slot: "background",
  },
  {
    id: "bg_neon_city",
    name: "Neon City",
    emoji: "🌃",
    description: "Cyberpunk city lights",
    cost: 250,
    currency: "coins",
    slot: "background",
  },
  {
    id: "bg_forest",
    name: "Enchanted Forest",
    emoji: "🌲",
    description: "Magical glowing forest",
    cost: 180,
    currency: "coins",
    slot: "background",
  },
  {
    id: "bg_space",
    name: "Outer Space",
    emoji: "🚀",
    description: "Stars and planets galore",
    cost: 300,
    currency: "coins",
    slot: "background",
  },
];

const PETS: ShopItem[] = [
  {
    id: "pet_cat",
    name: "Pixel Cat",
    emoji: "🐱",
    description: "A tiny pixelated companion",
    cost: 50,
    currency: "gems",
    slot: "pet",
  },
  {
    id: "pet_dragon",
    name: "Baby Dragon",
    emoji: "🐲",
    description: "Breathes tiny flames",
    cost: 75,
    currency: "gems",
    slot: "pet",
  },
  {
    id: "pet_robot",
    name: "Mini Robot",
    emoji: "🤖",
    description: "Beeps and boops with you",
    cost: 60,
    currency: "gems",
    slot: "pet",
  },
  {
    id: "pet_unicorn",
    name: "Unicorn",
    emoji: "🦄",
    description: "Sprinkles rainbow dust",
    cost: 90,
    currency: "gems",
    slot: "pet",
  },
  {
    id: "pet_fox",
    name: "Clever Fox",
    emoji: "🦊",
    description: "Always one step ahead",
    cost: 65,
    currency: "gems",
    slot: "pet",
  },
];

const EFFECTS: ShopItem[] = [
  {
    id: "effect_sparkle",
    name: "Sparkle Aura",
    emoji: "✨",
    description: "Glitter everywhere",
    cost: 100,
    currency: "coins",
    slot: "effect",
  },
  {
    id: "effect_fire",
    name: "Fire Trail",
    emoji: "🔥",
    description: "Blazing hot aura",
    cost: 120,
    currency: "coins",
    slot: "effect",
  },
  {
    id: "effect_lightning",
    name: "Lightning Bolt",
    emoji: "⚡",
    description: "Electric energy crackles",
    cost: 140,
    currency: "coins",
    slot: "effect",
  },
  {
    id: "effect_rainbow",
    name: "Rainbow Flow",
    emoji: "🌈",
    description: "All the colours at once",
    cost: 160,
    currency: "coins",
    slot: "effect",
  },
];

const ACCESSORIES: ShopItem[] = [
  {
    id: "acc_crown",
    name: "Golden Crown",
    emoji: "👑",
    description: "For the true royalty",
    cost: 40,
    currency: "gems",
    slot: "accessory",
  },
  {
    id: "acc_glasses",
    name: "Cool Glasses",
    emoji: "😎",
    description: "Too cool for school",
    cost: 30,
    currency: "gems",
    slot: "accessory",
  },
  {
    id: "acc_headphones",
    name: "Headphones",
    emoji: "🎧",
    description: "Always on the beat",
    cost: 35,
    currency: "gems",
    slot: "accessory",
  },
  {
    id: "acc_cape",
    name: "Hero Cape",
    emoji: "🦸",
    description: "Superhero in disguise",
    cost: 55,
    currency: "gems",
    slot: "accessory",
  },
];

const ALL_ITEMS: ShopItem[] = [
  ...BACKGROUNDS,
  ...PETS,
  ...EFFECTS,
  ...ACCESSORIES,
];

// ─── Shop Item Card ───────────────────────────────────────────────────────────

function ShopItemCard({
  item,
  onBuy,
  onEquip,
}: {
  item: ShopItem;
  onBuy: (item: ShopItem) => void;
  onEquip: (item: ShopItem) => void;
}) {
  const state = loadProgress();
  const owned = state.ownedItems.includes(item.id);
  const equipped = state.equippedItems[item.slot] === item.id;
  const balance = item.currency === "coins" ? state.coins : state.gems;
  const canAfford = balance >= item.cost;

  const currencyColor =
    item.currency === "coins"
      ? "text-[oklch(0.78_0.18_60)]"
      : "text-[oklch(0.72_0.2_310)]";
  const currencyBg =
    item.currency === "coins"
      ? "bg-[oklch(0.78_0.18_60/0.1)]"
      : "bg-[oklch(0.72_0.2_310/0.1)]";
  const currencyBorder =
    item.currency === "coins"
      ? "border-[oklch(0.78_0.18_60/0.3)]"
      : "border-[oklch(0.72_0.2_310/0.3)]";
  const currencyIcon = item.currency === "coins" ? "🪙" : "💎";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className="h-full"
    >
      <Card
        data-ocid={`shop.${item.id}.card`}
        className={`h-full border transition-all duration-200 flex flex-col ${
          equipped
            ? "border-accent/60 bg-accent/5 shadow-neon-green"
            : owned
              ? "border-primary/30 bg-primary/5"
              : canAfford
                ? "border-border bg-card hover:border-primary/30 hover:shadow-neon-cyan/20"
                : "border-border bg-card opacity-60"
        }`}
      >
        <CardContent className="p-4 flex flex-col gap-3 h-full">
          {/* Emoji + status */}
          <div className="flex items-start justify-between">
            <span className="text-4xl leading-none">{item.emoji}</span>
            <div className="flex flex-col items-end gap-1">
              {equipped && (
                <Badge className="text-[9px] font-mono bg-accent/15 text-accent border border-accent/40 px-1.5 py-0">
                  ✓ Equipped
                </Badge>
              )}
              {owned && !equipped && (
                <Badge className="text-[9px] font-mono bg-primary/10 text-primary border border-primary/30 px-1.5 py-0">
                  Owned
                </Badge>
              )}
              {!owned && !canAfford && (
                <Badge
                  variant="outline"
                  className="text-[9px] font-mono border-destructive/30 text-destructive/60 px-1.5 py-0"
                >
                  Can't afford
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="font-display font-bold text-sm text-foreground mb-0.5">
              {item.name}
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              {item.description}
            </p>
          </div>

          {/* Price + action */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-mono font-bold ${currencyColor} ${currencyBg} border ${currencyBorder}`}
            >
              {currencyIcon} {item.cost}
            </span>

            {equipped ? (
              <span className="text-xs font-mono text-accent font-bold">
                ✓ Active
              </span>
            ) : owned ? (
              <Button
                data-ocid={`shop.${item.id}.secondary_button`}
                size="sm"
                variant="outline"
                onClick={() => onEquip(item)}
                className="rounded-md font-mono font-bold text-xs border-primary/30 text-primary hover:bg-primary/10 hover:shadow-neon-cyan transition-all h-7 px-2"
              >
                Equip
              </Button>
            ) : (
              <Button
                data-ocid={`shop.${item.id}.primary_button`}
                size="sm"
                onClick={() => onBuy(item)}
                disabled={!canAfford}
                className="rounded-md font-mono font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan disabled:opacity-40 transition-all h-7 px-2"
              >
                Buy
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const { triggerConfetti } = useConfetti();
  const [, forceUpdate] = useState(0);

  function refresh() {
    forceUpdate((n) => n + 1);
  }

  function handleBuy(item: ShopItem) {
    const success =
      item.currency === "coins" ? spendCoins(item.cost) : spendGems(item.cost);

    if (!success) {
      toast.error(
        `Not enough ${item.currency}! Complete quests to earn more 🏃`,
      );
      return;
    }

    addOwnedItem(item.id);
    equipItem(item.slot, item.id);
    triggerConfetti(`${item.emoji} ${item.name} unlocked!`);
    toast.success(
      `${item.emoji} ${item.name} purchased and equipped! Check your profile.`,
    );
    refresh();
  }

  function handleEquip(item: ShopItem) {
    equipItem(item.slot, item.id);
    toast.success(`${item.emoji} ${item.name} equipped!`);
    refresh();
  }

  const state = loadProgress();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  function ItemGrid({ items }: { items: ShopItem[] }) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
      >
        {items.map((item) => (
          <motion.div key={item.id} variants={cardVariants}>
            <ShopItemCard item={item} onBuy={handleBuy} onEquip={handleEquip} />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-10 pb-12 px-4">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.72 0.2 310)" }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-10 -left-20 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.18 60)" }}
        />
        <div className="container max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <span>🛒</span>
              <span>Reward Shop</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              🛒 The Shop
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl font-mono">
              Spend your coins and gems on sick cosmetics — backgrounds, pets,
              effects, and accessories. Flex your style!
            </p>

            {/* Balance strip */}
            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[oklch(0.78_0.18_60/0.1)] border border-[oklch(0.78_0.18_60/0.3)]">
                <span className="text-xl">🪙</span>
                <div>
                  <p className="font-mono font-extrabold text-base text-[oklch(0.78_0.18_60)] leading-none">
                    {state.coins}
                  </p>
                  <p className="font-mono text-[10px] text-[oklch(0.78_0.18_60/0.7)]">
                    Coins
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[oklch(0.72_0.2_310/0.1)] border border-[oklch(0.72_0.2_310/0.3)]">
                <span className="text-xl">💎</span>
                <div>
                  <p className="font-mono font-extrabold text-base text-[oklch(0.72_0.2_310)] leading-none">
                    {state.gems}
                  </p>
                  <p className="font-mono text-[10px] text-[oklch(0.72_0.2_310/0.7)]">
                    Gems
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                Complete quests to earn more! ⚔️
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop content */}
      <div className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <Tabs defaultValue="all" data-ocid="shop.tabs.tab">
            <TabsList className="mb-6 bg-secondary/60 border border-border flex-wrap h-auto gap-0.5 p-1">
              {[
                { value: "all", label: "🌟 All Items" },
                { value: "backgrounds", label: "🖼️ Backgrounds" },
                { value: "pets", label: "🐱 Pets" },
                { value: "effects", label: "✨ Effects" },
                { value: "accessories", label: "👑 Accessories" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-ocid={`shop.${tab.value}.tab`}
                  className="font-mono text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-neon-cyan"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
                    🖼️ Backgrounds{" "}
                    <span className="text-xs font-mono text-muted-foreground">
                      (coins)
                    </span>
                  </h3>
                  <ItemGrid items={BACKGROUNDS} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
                    🐱 Pets{" "}
                    <span className="text-xs font-mono text-muted-foreground">
                      (gems)
                    </span>
                  </h3>
                  <ItemGrid items={PETS} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
                    ✨ Effects{" "}
                    <span className="text-xs font-mono text-muted-foreground">
                      (coins)
                    </span>
                  </h3>
                  <ItemGrid items={EFFECTS} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
                    👑 Accessories{" "}
                    <span className="text-xs font-mono text-muted-foreground">
                      (gems)
                    </span>
                  </h3>
                  <ItemGrid items={ACCESSORIES} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="backgrounds">
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-4">
                  🪙 Backgrounds cost coins — complete daily quests to earn more
                </p>
                <ItemGrid items={BACKGROUNDS} />
              </div>
            </TabsContent>

            <TabsContent value="pets">
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-4">
                  💎 Pets cost gems — earn them from weekly quests
                </p>
                <ItemGrid items={PETS} />
              </div>
            </TabsContent>

            <TabsContent value="effects">
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-4">
                  🪙 Effects cost coins — show off your aura!
                </p>
                <ItemGrid items={EFFECTS} />
              </div>
            </TabsContent>

            <TabsContent value="accessories">
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-4">
                  💎 Accessories cost gems — crown yourself!
                </p>
                <ItemGrid items={ACCESSORIES} />
              </div>
            </TabsContent>
          </Tabs>

          {/* Equipped preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-10 bg-card border border-border rounded-lg p-6"
          >
            <h2 className="font-display font-bold text-base text-foreground mb-4">
              ✨ Currently Equipped
            </h2>
            <div className="flex flex-wrap gap-3">
              {(
                [
                  { slot: "background", label: "Background" },
                  { slot: "pet", label: "Pet" },
                  { slot: "effect", label: "Effect" },
                  { slot: "accessory", label: "Accessory" },
                ] as { slot: keyof typeof state.equippedItems; label: string }[]
              ).map(({ slot, label }) => {
                const itemId = state.equippedItems[slot];
                const item = ALL_ITEMS.find((i) => i.id === itemId);
                return (
                  <div
                    key={slot}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono ${
                      item
                        ? "border-primary/30 bg-primary/5 text-foreground"
                        : "border-border bg-secondary/20 text-muted-foreground"
                    }`}
                  >
                    <span>{item ? item.emoji : "—"}</span>
                    <div>
                      <p className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground">
                        {label}
                      </p>
                      <p>{item ? item.name : "None equipped"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
