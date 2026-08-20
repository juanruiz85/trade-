import { system, world } from "@minecraft/server";

function addLores() {
    const emptyText = "§r§f";
    const useText = "§r§bInteract:§f";
    const effectText = "§r§aEffect:§f";
    const extraText = "§r§6Bonus:§f";
    const enchantText = "§r§7Enchantable§f";
    const unbreakableText = "§r§9Unbreakable§f";
    
    const loreData = {
        ["dodo_ta:torch_helmet"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fWearing the helmet",
            "§r§femits light around you",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_sword"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fKilling an entity drops",
            "§r§fa random dye",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_pickaxe"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fBreaking a block drops",
            "§r§fa random concrete block",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_axe"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fBreaking a block drops",
            "§r§fa random terracotta block",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_shovel"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fBreaking a block drops",
            "§r§fa random concrete powder block",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_hoe"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fBreaking a block drops a",
            "§r§frandom wool block and replants",
            "§r§ffully grown crops",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_helmet"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§cR§6a§ei§an§bb§3o§9w §cA§er§am§bo§dr§f to get",
            "§r§bSpeed§f and §aJump Boost§f",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_chestplate"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§cR§6a§ei§an§bb§3o§9w §cA§er§am§bo§dr§f to get",
            "§r§bSpeed§f and §aJump Boost§f",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_leggings"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§cR§6a§ei§an§bb§3o§9w §cA§er§am§bo§dr§f to get",
            "§r§bSpeed§f and §aJump Boost§f",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:rainbow_boots"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§cR§6a§ei§an§bb§3o§9w §cA§er§am§bo§dr§f to get",
            "§r§bSpeed§f and §aJump Boost§f",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:diamond_clock"]: [
            emptyText,
            effectText,
            "§r§fSpeed up the day",
            "§r§fand night cycle"
        ],
        ["dodo_ta:exp_bag_small"]: [
            emptyText,
            useText,
            "§r§fGain a small amount",
            "§r§fof experience points"
        ],
        ["dodo_ta:exp_bag_large"]: [
            emptyText,
            useText,
            "§r§fGain a large amount",
            "§r§fof experience points"
        ],
        ["dodo_ta:levels_10"]: [
            emptyText,
            useText,
            "§r§fGain §b10 §3experience levels§f"
        ],
        ["dodo_ta:levels_100"]: [
            emptyText,
            useText,
            "§r§fGain §b100 §3experience levels§f"
        ],
        ["dodo_ta:mega_pickaxe"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fMine blocks in",
            "§r§fa 3x3 area",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:mega_axe"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fBreak all connected wood,",
            "§r§flogs, and stripped logs",
            "§r§fwhen you break one",
            emptyText,
            useText,
            "§r§fInteract with wood or log",
            "§r§fto strip all connected ones",
            emptyText,
            "§r§cBe careful!§r§f This also",
            "§r§faffects blocks you've placed",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:mega_shovel"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fBreak blocks in a",
            "§r§f3-block cylinder.",
            emptyText,
            useText,
            "§r§fConvert blocks to dirt path",
            "§r§fin a 3-block cylinder.",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:mega_hoe"]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fConvert blocks to",
            "§r§ffarmland in a 3x3 area",
            emptyText,
            unbreakableText
        ],
        ["dodo:warden_totem"]: [
            emptyText,
            effectText,
            "§r§fDoubles your health",
            emptyText,
            "§r§d§lTIP!§r§f Can be held",
            "§r§fin your off-hand",
            emptyText,
            unbreakableText
        ],
        ["dodo:warden_sword"]: [
            enchantText,
            emptyText,
            useText,
            "§r§fRepel all nearby mobs",
            "§r§fin a 6-block radius",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:warden_helmet"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§3Warden Armor§f to become",
            "§r§9invisible§f when sneaking",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:warden_chestplate"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§3Warden Armor§f to become",
            "§r§9invisible§f when sneaking",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:warden_leggings"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§3Warden Armor§f to become",
            "§r§9invisible§f when sneaking",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:warden_boots"]: [
            enchantText,
            emptyText,
            extraText,
            "§r§fWear a full set of",
            "§r§3Warden Armor§f to become",
            "§r§9invisible§f when sneaking",
            emptyText,
            unbreakableText
        ],
        ["dodo_ta:warden_apple"]: [
            emptyText,
            effectText,
            "§r§fProvides positive",
            "§r§apotion effects§f for §d180s§f"
        ],
        [`dodo_ta:golden_trident`]: [
            enchantText,
            emptyText,
            useText,
            "§r§fSummon lightning",
            emptyText,
            effectText,
            "§r§fYou get §bWater Breathing§f",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:warhammer`]: [
            enchantText,
            emptyText,
            useText,
            "§r§fPerform a ground slam,",
            "§r§fdealing knockback and",
            "§r§c10 damage§f to entities",
            "§r§fwithin 6 blocks",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:sickle`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fAutomatically replant fully grown",
            "§r§fcrops when harvested",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:scythe`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fSpawn a baby animal upon",
            "§r§fkilling an adult",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:spear`]: [
            enchantText,
            emptyText,
            useText,
            "§r§fAttack entities up to 12 blocks",
            "§r§fahead, dealing §c6 damage§f",
            emptyText,
            effectText,
            "§r§fChance to obtain a head from",
            "§r§fa Zombie, Skeleton, Creeper, Piglin",
            "§r§for Ender Dragon",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:magic_wand`]: [
            emptyText,
            useText,
            "§r§fCast a spell on nearby",
            "§r§fentities, inflicting §aPoison§f,",
            "§r§9Slowness§f, and §7Weakness§f for 8s",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:club`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fThe lower your health is,",
            "§r§fthe stronger you are",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:flamebrand_00`]: [
            emptyText,
            useText,
            "§r§fIgnite the Flamebrand",
            emptyText,
            "§r§8Effect (interact to enable):",
            "§r§8Set entities on fire",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:flamebrand_01`]: [
            emptyText,
            useText,
            "§r§fExtinguish the Flamebrand",
            emptyText,
            effectText,
            "§r§fSet entities on §cfire§f",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:venomstrike`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§2Poison§f entities for 4s",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:fire_armblade`]: [
            emptyText,
            useText,
            "§r§fSet entities within",
            "§r§f7 blocks on §cfire§f",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:scimitar`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fChance to get §6gold§f upon",
            "§r§fkilling an entity",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:dagger`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fChance to steal §dmaterials§f",
            "§r§fupon hitting an entity",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:battle_axe`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fGain §bSpeed§f and §cStrength§f",
            "§r§ffor 10s §7(up to level V)§f upon",
            "§r§fkilling entities",
            emptyText,
            extraText,
            "§r§fWorks like an axe",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:dragonfang`]: [
            enchantText,
            emptyText,
            useText,
            "§r§fUnleash dragon breath around you,",
            "§r§fapplying §9Slowness§f and dealing",
            "§r§c5 damage§f every second for 4s",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:great_hammer`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fGreat knockback",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:katana`]: [
            enchantText,
            emptyText,
            useText,
            "§r§fJump super high without",
            "§r§ftaking fall damage",
            emptyText,
            effectText,
            "§r§fYou get §bSpeed§f and §aJump Boost§f",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:villager_claymore`]: [
            enchantText,
            emptyText,
            effectText,
            "§r§fGain an §aemerald§f with every",
            "§r§fkill, and convert zombies into",
            "§r§evillagers§f upon hittig them",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:copper_sword_00`]: [
            emptyText,
            effectText,
            "§r§fHigh chance to §3oxidize§f",
            "§r§fwhen hitting an entity. Increased",
            "§r§foxidation deals more damage",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:copper_sword_01`]: [
            emptyText,
            effectText,
            "§r§fModerate chance to §3oxidize§f",
            "§r§fwhen hitting an entity. Increased",
            "§r§foxidation deals more damage",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:copper_sword_02`]: [
            emptyText,
            effectText,
            "§r§fLow chance to §3oxidize§f",
            "§r§fwhen hitting an entity. Increased",
            "§r§foxidation deals more damage",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:copper_sword_03`]: [
            enchantText,
            emptyText,
            "§r§fMaximum §3oxidation§f",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:end_wand`]: [
            emptyText,
            useText,
            "§r§dTeleport§f to the block",
            "§r§fyou're looking at",
            "§r§7(Max 64 blocks)§f",
            emptyText,
            effectText,
            "§r§fHitting entities §dteleports§f",
            "§r§fthem to a random location",
            emptyText,
            unbreakableText
        ],
        [`dodo_ta:double_axe`]: [
            enchantText,
            emptyText,
            useText,
            "§r§fDamage entities within",
            "§r§f5 blocks, dealing §c8 damage§f",
            emptyText,
            extraText,
            "§r§fWorks like an axe",
            emptyText,
            unbreakableText
        ]
    };

    for (const player of world.getPlayers()) {
        let inventory = player.getComponent("inventory").container;
        for (let slot = 0; slot < inventory.size; slot++) {
            let item = inventory.getItem(slot);
            if (!item || item.getLore().length > 0) continue;
            if (loreData[item.typeId]) {
                item.setLore(loreData[item.typeId]);
                inventory.setItem(slot, item);
            }
        }
    }
}

system.runInterval(addLores, 5);