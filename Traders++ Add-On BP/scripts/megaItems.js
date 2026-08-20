import { world, system } from "@minecraft/server";

const UNLESS_BLOCKS = "unless block ~ ~ ~ bedrock [] unless block ~ ~ ~ end_portal [] unless block ~ ~ ~ end_portal_frame [] unless block ~ ~ ~ barrier [] unless block ~ ~ ~ light_block [] unless block ~ ~ ~ structure_block [] unless block ~ ~ ~ structure_void [] unless block ~ ~ ~ deny [] unless block ~ ~ ~ allow [] unless block ~ ~ ~ border_block [] unless block ~ ~ ~ command_block [] unless block ~ ~ ~ repeating_command_block [] unless block ~ ~ ~ chain_command_block []";
const LOG_TYPES = [ "oak_log", "spruce_log", "birch_log", "jungle_log", "acacoa_log", "dark_oak_log", "mangrove_log", "cherry_log", "crimson_stem", "warped_stem", "oak_wood", "spruce_wood", "birch_wood", "jungle_wood", "acacoa_wood", "dark_oak_wood", "mangrove_wood", "cherry_wood", "stripped_oak_log", "stripped_spruce_log", "stripped_birch_log", "stripped_jungle_log", "stripped_acacoa_log", "stripped_dark_oak_log", "stripped_mangrove_log", "stripped_cherry_log", "stripped_crimson_stem", "stripped_warped_stem", "stripped_oak_wood", "stripped_spruce_wood", "stripped_birch_wood", "stripped_jungle_wood", "stripped_acacoa_wood", "stripped_dark_oak_wood", "stripped_mangrove_wood", "stripped_cherry_wood", "stripped_bamboo_wood" ];
const MAX_BLOCKS = 128;

world.beforeEvents.playerBreakBlock.subscribe(event => {
    const { player, block } = event;
    const dimension = player.dimension;

    const item = player.getComponent("equippable")?.getEquipment("Mainhand");

    if (item && item.typeId === "dodo_ta:mega_axe") {
        if (LOG_TYPES.includes(block.typeId.replace("minecraft:", ""))) {
            breakAdjacentLogs(player, dimension, block.location, block.typeId);
        }
    }

    if (item && item.typeId === "dodo_ta:mega_pickaxe") {
        megaPickaxeBreak(player, block);
    }

    if (item && item.typeId === "dodo_ta:mega_shovel") {
        megaShovelBreak(player, block);
    }
});

world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { player, block } = event;
    const { x, y, z } = block.location;

    const item = player.getComponent("equippable")?.getEquipment("Mainhand");

    if (item && item.typeId === "dodo_ta:mega_axe") {
        changeAdjacentLogs(player, player.dimension, block.location, block.typeId);
        event.cancel = true;
    }

    if (item && item.typeId === "dodo_ta:mega_hoe") {
        megaHoeUse(player, block, x, y, z);
        event.cancel = true;
    }

    if (item && item.typeId === "dodo_ta:mega_shovel") {
        megaShovelUse(player, block);
        event.cancel = true;
    }
});

function breakAdjacentLogs(player, dimension, blockLocation, blockType) {
    const blocksToBreak = new Set();
    const stack = [{ location: blockLocation, count: 0 }];
    const directions = [];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                if (x === 0 && y === 0 && z === 0) continue;
                directions.push({ x, y, z });
            }
        }
    }

    while (stack.length > 0 && blocksToBreak.size < MAX_BLOCKS) {
        const current = stack.pop();
        const locationKey = `${current.location.x},${current.location.y},${current.location.z}`;
        
        if (blocksToBreak.has(locationKey) || current.count >= MAX_BLOCKS) {
            continue;
        }

        const adjacentBlock = dimension.getBlock(current.location);
        if (adjacentBlock && adjacentBlock.typeId === blockType) {
            blocksToBreak.add(locationKey);
            for (const direction of directions) {
                const adjacentLocation = {
                    x: current.location.x + direction.x,
                    y: current.location.y + direction.y,
                    z: current.location.z + direction.z
                };
                stack.push({ location: adjacentLocation, count: current.count + 1 });
            }
        }
    }

    if (blocksToBreak.size > 1) {
        for (const locationKey of blocksToBreak) {
            const [x, y, z] = locationKey.split(',').map(Number);
            if (player.getGameMode() === "creative") {
                player.runCommandAsync(`setblock ${x} ${y} ${z} air`);
            } else {
                player.runCommandAsync(`setblock ${x} ${y} ${z} air [] destroy`);
            }
        }
    }
}

function changeAdjacentLogs(player, dimension, blockLocation, blockType) {
    const blocksToChange = new Set();
    const stack = [{ location: blockLocation, count: 0 }];
    const directions = [];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                if (x === 0 && y === 0 && z === 0) continue;
                directions.push({ x, y, z });
            }
        }
    }
    
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
    }

    while (stack.length > 0 && blocksToChange.size < MAX_BLOCKS) {
        const current = stack.pop();
        const locationKey = `${current.location.x},${current.location.y},${current.location.z}`;

        if (blocksToChange.has(locationKey) || current.count >= MAX_BLOCKS) {
            continue;
        }

        const adjacentBlock = dimension.getBlock(current.location);
        if (adjacentBlock && adjacentBlock.typeId === blockType) {
            blocksToChange.add(locationKey);
            for (const direction of directions) {
                const adjacentLocation = {
                    x: current.location.x + direction.x,
                    y: current.location.y + direction.y,
                    z: current.location.z + direction.z
                };
                stack.push({ location: adjacentLocation, count: current.count + 1 });
            }
        }
    }

    if (blocksToChange.size > 1) {
        for (const locationKey of blocksToChange) {
            const [x, y, z] = locationKey.split(',').map(Number);
            const block = dimension.getBlock({ x, y, z });

            if (block && logToStrippedLogMap[block.typeId]) {
                system.run(() => {
                    block.setType(logToStrippedLogMap[block.typeId]);
                })
            }
        }
    }
}

function megaHoeUse(player, block, centerX, centerY, centerZ) {
    const offsets = [-1, 0, 1];

    for (const offsetX of offsets) {
        for (const offsetZ of offsets) {
            const x = centerX + offsetX;
            const z = centerZ + offsetZ;
            const block = player.dimension.getBlock({ x: x, y: centerY, z: z });

            if (!block) continue;

            system.run(() => {
                switch (block.typeId) {
                    case "minecraft:dirt":
                    case "minecraft:grass_block":
                        block.setType("minecraft:farmland");
                        player.runCommandAsync(`playsound use.gravel @a[r=8] ${x} ${centerY} ${z} 1 0.8 1`);
                        break;
                    case "minecraft:coarse_dirt":
                        block.setType("minecraft:dirt");
                        player.runCommandAsync(`playsound use.gravel @a[r=8] ${x} ${centerY} ${z} 1 0.8 1`);
                        break;
                    case "minecraft:dirt_with_roots":
                        block.setType("minecraft:dirt");
                        player.runCommandAsync(`loot spawn ${x} ${centerY + 1} ${z} loot "dodo/ta/hanging_roots"`);
                        player.runCommandAsync(`playsound use.gravel @a[r=8] ${x} ${centerY} ${z} 1 0.8 1`);
                        break;
                }  
            })
        }
    }
};

function megaPickaxeBreak(player, block) {
    const { x, y, z } = block.location;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {

                if (player.getGameMode() === "creative") {
                    player.runCommandAsync(`execute positioned ${x + dx} ${y + dy} ${z + dz} run setblock ~ ~ ~ air`);
                } else {
                    player.runCommandAsync(`execute positioned ${x + dx} ${y + dy} ${z + dz} ${UNLESS_BLOCKS} run setblock ~ ~ ~ air [] destroy`);
                }
            }
        }
    }
}

function megaShovelBreak(player, block) {
    const { x, y, z } = block.location;

    for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
            if ((Math.abs(dx) === 2 && Math.abs(dz) === 2)) continue;

            if (player.getGameMode() === "creative") {
                player.runCommandAsync(`execute positioned ${x + dx} ${y} ${z + dz} run setblock ~ ~ ~ air`);
            } else {
                player.runCommandAsync(`execute positioned ${x + dx} ${y} ${z + dz} ${UNLESS_BLOCKS} run setblock ~ ~ ~ air [] destroy`);
            }
        }
    }
}

function megaShovelUse(player, block) {
    const { x, y, z } = block.location;

    for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
            if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;

            const targetBlock = player.dimension.getBlock({ x: x + dx, y, z: z + dz });

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
                            player.runCommandAsync(`playsound use.grass @a[r=8] ${x + dx} ${y} ${z + dz} 1 0.8 1`);
                            break;
                    }
                });
            }
        }
    }
}