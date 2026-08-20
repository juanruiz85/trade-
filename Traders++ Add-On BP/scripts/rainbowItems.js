import { world, system } from "@minecraft/server";

world.beforeEvents.playerBreakBlock.subscribe(event => {
    const { player, block } = event;

    const item = player.getComponent("equippable")?.getEquipment("Mainhand");

    if (item && item.typeId === "dodo_ta:rainbow_axe") {
        rainbowAxeBreak(player, block);
        event.cancel = true;
    }

    if (item && item.typeId === "dodo_ta:rainbow_pickaxe") {
        rainbowPickaxeBreak(player, block);
        event.cancel = true;
    }

    if (item && item.typeId === "dodo_ta:rainbow_shovel") {
        rainbowShovelBreak(player, block);
        event.cancel = true;
    }

    if (item && item.typeId === "dodo_ta:rainbow_hoe") {
        rainbowHoeBreak(player, block);
        event.cancel = true;
    }
});

world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { player, block } = event;
    const { x, y, z } = block.location;

    const item = player.getComponent("equippable")?.getEquipment("Mainhand");

    if (item && (item.typeId === "dodo_ta:rainbow_axe" || item.typeId === "dodo_ta:pick_axe")) {
        rainbowAxeUse(player, player.dimension, block.location, block.typeId);
        event.cancel = true;
    }

    if (item && item.typeId === "dodo_ta:rainbow_hoe") {
        rainbowHoeUse(player, x, y, z);
        event.cancel = true;
    }

    if (item && item.typeId === "dodo_ta:rainbow_shovel") {
        rainbowShovelUse(player, block);
        event.cancel = true;
    }
});

world.afterEvents.entityDie.subscribe(event => {
    const attacker = event.damageSource.damagingEntity;
    const target = event.deadEntity;

    if (attacker && attacker.typeId === "minecraft:player") {
        const item = attacker.getComponent("equippable")?.getEquipment("Mainhand");
        if (item && item.typeId === "dodo_ta:rainbow_sword") {
            rainbowSwordUse(target);
        }
    }
});

function rainbowAxeBreak(player, block) {
    const [x, y, z] = [block.x, block.y, block.z];
    player.runCommandAsync(`setblock ${x} ${y} ${z} air []`);
    player.runCommandAsync(`loot spawn ${x} ${y + 0.1} ${z} loot "dodo/ta/rainbow_axe"`);
    player.runCommandAsync(`playsound dig.wood @a[r=8] ${x} ${y} ${z} 1 1 1`);
    player.runCommandAsync(`particle dodo_ta:rainbow_tool ${x} ${y} ${z}`);
}

function rainbowPickaxeBreak(player, block) {
    const [x, y, z] = [block.x, block.y, block.z];
    player.runCommandAsync(`setblock ${x} ${y} ${z} air []`);
    player.runCommandAsync(`loot spawn ${x} ${y + 0.1} ${z} loot "dodo/ta/rainbow_pickaxe"`);
    player.runCommandAsync(`playsound dig.stone @a[r=8] ${x} ${y} ${z} 1 1 1`);
    player.runCommandAsync(`particle dodo_ta:rainbow_tool ${x} ${y} ${z}`);
}

function rainbowShovelBreak(player, block) {
    const [x, y, z] = [block.x, block.y, block.z];
    player.runCommandAsync(`setblock ${x} ${y} ${z} air []`);
    player.runCommandAsync(`loot spawn ${x} ${y + 0.1} ${z} loot "dodo/ta/rainbow_shovel"`);
    player.runCommandAsync(`playsound dig.sand @a[r=8] ${x} ${y} ${z} 1 1 1`);
    player.runCommandAsync(`particle dodo_ta:rainbow_tool ${x} ${y} ${z}`);
}

function rainbowHoeBreak(player, block) {
    const [x, y, z] = [block.x, block.y, block.z];
    const crops = [
        'minecraft:wheat',
        'minecraft:potatoes',
        'minecraft:carrots',
        'minecraft:beetroot'
    ];
    
    let placeCrop = block.typeId;
    if (crops.includes(block.typeId) && block.permutation.getState('growth') === 7) {
        const { x, y, z } = block.location;
        player.runCommandAsync(`setblock ${x} ${y} ${z} ${placeCrop} []`);
    } else {   
        player.runCommandAsync(`setblock ${x} ${y} ${z} air []`);
    }

    player.runCommandAsync(`loot spawn ${x} ${y + 0.1} ${z} loot "dodo/ta/rainbow_hoe"`);
    player.runCommandAsync(`playsound dig.grass @a[r=8] ${x} ${y} ${z} 1 0.75 1`);
    player.runCommandAsync(`particle dodo_ta:rainbow_tool ${x} ${y} ${z}`);
}

function rainbowAxeUse(player, dimension, blockLocation, blockType) {
    const logToStrippedLogMap = {
        "minecraft:oak_log": "minecraft:stripped_oak_log",
        "minecraft:spruce_log": "minecraft:stripped_spruce_log",
        "minecraft:birch_log": "minecraft:stripped_birch_log",
        "minecraft:jungle_log": "minecraft:stripped_jungle_log",
        "minecraft:acacia_log": "minecraft:stripped_acacia_log",
        "minecraft:dark_oak_log": "minecraft:stripped_dark_oak_log",
        "minecraft:mangrove_log": "minecraft:stripped_mangrove_log",
        "minecraft:cherry_log": "minecraft:stripped_cherry_log",
        "minecraft:crimson_stem": "minecraft:stripped_crimson_stem",
        "minecraft:warped_stem": "minecraft:stripped_warped_stem",
        "minecraft:bamboo_block": "minecraft:stripped_bamboo_block",
        "minecraft:oak_wood": "minecraft:stripped_oak_wood",
        "minecraft:spruce_wood": "minecraft:stripped_spruce_wood",
        "minecraft:birch_wood": "minecraft:stripped_birch_wood",
        "minecraft:jungle_wood": "minecraft:stripped_jungle_wood",
        "minecraft:acacia_wood": "minecraft:stripped_acacia_wood",
        "minecraft:dark_oak_wood": "minecraft:stripped_dark_oak_wood",
        "minecraft:mangrove_wood": "minecraft:stripped_mangrove_wood",
        "minecraft:cherry_wood": "minecraft:stripped_cherry_wood"
    };

    const block = dimension.getBlock(blockLocation);

    if (block && block.typeId === blockType && logToStrippedLogMap[block.typeId]) {
        system.run(() => {
            player.runCommandAsync(`playsound step.wood @a[r=8] ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} 1 0.8 1`);
            block.setType(logToStrippedLogMap[block.typeId]);
        })
    }
}


function rainbowShovelUse(player, block) {
    const { x, y, z } = block.location;
    const targetBlock = player.dimension.getBlock({ x: x, y: y, z: z });

    if (targetBlock) {
        system.run(() => {
            switch (targetBlock.typeId) {
                case "minecraft:grass_block":
                case "minecraft:dirt":
                case "minecraft:coarse_dirt":
                case "minecraft:dirt_with_roots":
                case "minecraft:podzol":
                case "minecraft:mycelium":
                targetBlock.setType("minecraft:grass_path");
                player.runCommandAsync(`playsound use.grass @a[r=8] ${x} ${y} ${z} 1 0.8 1`);
                break;
            }
        });
    }
}

function rainbowHoeUse(player, x, y, z) {
    const targetBlock = player.dimension.getBlock({ x: x, y: y, z: z });

    if (!targetBlock) return;

    system.run(() => {
        switch (targetBlock.typeId) {
            case "minecraft:dirt":
            case "minecraft:grass_block":
                targetBlock.setType("minecraft:farmland");
                player.runCommandAsync(`playsound use.gravel @a[r=8] ${x} ${y} ${z} 1 0.8 1`);
                break;
            case "minecraft:coarse_dirt":
                targetBlock.setType("minecraft:dirt");
                player.runCommandAsync(`playsound use.gravel @a[r=8] ${x} ${y} ${z} 1 0.8 1`);
                break;
            case "minecraft:dirt_with_roots":
                targetBlock.setType("minecraft:dirt");
                player.runCommandAsync(`loot spawn ${x} ${y + 1} ${z} loot "dodo/ta/hanging_roots"`);
                player.runCommandAsync(`playsound use.gravel @a[r=8] ${x} ${y} ${z} 1 0.8 1`);
                break;
        }
    });
}

function rainbowSwordUse(target) {
    target.runCommandAsync(`loot spawn ~ ~0.1 ~ loot "dodo/ta/rainbow_sword"`);
    target.runCommandAsync(`particle dodo_ta:rainbow_tool ~ ~-0.5 ~`);
}

system.runInterval(rainbowArmor, 1);
function rainbowArmor() {
    for (const player of world.getPlayers()) {
        const hasRainbowArmorProperty = player.getDynamicProperty("rainbow_armor");

        const requiredArmor = ["dodo_ta:rainbow_helmet", "dodo_ta:rainbow_chestplate", "dodo_ta:rainbow_leggings", "dodo_ta:rainbow_boots"];
        const isWearingRainbowArmor = ["Head", "Chest", "Legs", "Feet"].every((slot, i) => player.getComponent("equippable")?.getEquipment(slot)?.typeId === requiredArmor[i]);

        if (isWearingRainbowArmor && !hasRainbowArmorProperty) {
            player.runCommandAsync("effect @s speed infinite 2 true");
            player.runCommandAsync("effect @s jump_boost infinite 2 true");
            player.setDynamicProperty("rainbow_armor", true);
        } else if (!isWearingRainbowArmor && hasRainbowArmorProperty) {
            player.runCommandAsync("effect @s speed 0");
            player.runCommandAsync("effect @s jump_boost 0");
            player.setDynamicProperty("rainbow_armor", false);
        }
        
        if (hasRainbowArmorProperty) {
            player.runCommandAsync("particle dodo_ta:rainbow_armor ~ ~ ~");
        }
    }
}