import { system, world } from "@minecraft/server";

import { INANIMATES } from '../main.js';

export function goldenTrident(player) {
    const foundBlock = player.getBlockFromViewDirection({ maxDistance: 64 });

    player.runCommandAsync(`playsound bubble.upinside @a[r=8] ~ ~ ~ 0.75 1.25 0.75`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.golden_trident.player`);

    if (foundBlock) {
        const { x, y, z } = foundBlock.block.location;
        player.runCommandAsync(`summon lightning_bolt ${x} ${y} ${z}`);
        player.runCommandAsync(`particle dodo_ta:golden_trident_use ${x} ${y} ${z}`);
    } else {
        player.runCommandAsync(`summon lightning_bolt ${player.location.x} 500 ${player.location.z}`);
    }
}

export function warhammer(player) {
    player.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 1.2 1`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.warhammer.player`);
    player.runCommandAsync(`particle dodo_ta:warhammer_use_1 ~ ~ ~`);
    system.run(() => {    
        player.applyKnockback(0, 0, 0, 0.5);
    })
    system.runTimeout(() => {
        player.setDynamicProperty("dodo_ta_warhammer_jump", true);
    }, 5)
}

export function spear(player) {
    const damage = 7;
    const offset = 1;
    const radius = 1.2;

    player.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 1.2 1`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.spear.player`);

    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^1 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^2 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^3 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^4 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^5 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^6 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^7 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^8 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^9 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^10 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`execute positioned ~ ~${offset} ~ run execute positioned ^ ^ ^11 run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:spear,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);

    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^1`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^2`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^3`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^4`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^5`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^6`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^7`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^8`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^9`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^10`);
    player.runCommandAsync(`particle dodo_ta:spear_use ^ ^ ^11`);
}

export function magicWand(player) {
    const radius = 16;

    player.runCommandAsync(`execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:magic_wand,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] at @s run particle dodo_ta:magic_wand_target_1 ~ ~ ~`);
    player.runCommandAsync(`execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:magic_wand,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] at @s run particle dodo_ta:magic_wand_target_2 ~ ~ ~`);
    player.runCommandAsync(`execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:magic_wand,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run effect @s fatal_poison 8 1 true`);
    player.runCommandAsync(`execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:magic_wand,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run effect @s slowness 8 1 true`);
    player.runCommandAsync(`execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:magic_wand,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run effect @s weakness 8 1 true`);
    player.runCommandAsync(`execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:magic_wand,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run playsound mob.evocation_illager.cast_spell @a[r=8] ~ ~ ~ 0.3 1.5 0.3`);

    player.runCommandAsync(`playsound mob.evocation_illager.cast_spell @a[r=8] ~ ~ ~ 1 1 1`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.magic_wand.player`);
    player.runCommandAsync(`particle dodo_ta:magic_wand_use ~ ~ ~`);
}

export function flameBrandA(player) {
    player.runCommandAsync(`playsound mob.blaze.shoot @a[r=8] ~ ~ ~ 1 0.8 1`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.flamebrand.player`);
    player.runCommandAsync(`execute if entity @s[hasitem={item=dodo_ta:flamebrand_00,location=slot.weapon.mainhand}] run replaceitem entity @s slot.weapon.mainhand 0 dodo_ta:flamebrand_01`);
    player.runCommandAsync(`particle dodo_ta:flamebrand_00_use`);
}
export function flameBrandB(player) {
    player.runCommandAsync(`playsound random.fizz @a[r=8] ~ ~ ~ 1 2 1`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.flamebrand.player`);
    player.runCommandAsync(`execute if entity @s[hasitem={item=dodo_ta:flamebrand_01,location=slot.weapon.mainhand}] run replaceitem entity @s slot.weapon.mainhand 0 dodo_ta:flamebrand_00`);
}

export function fireArmblade(player) {
    const playerPos = player.location;
    const radius = 7;

    const entities = world.getDimension(player.dimension.id).getEntities({
        location: playerPos,
        maxDistance: radius
    });

    entities.forEach(target => {
        if (target === player) return;

        target.runCommandAsync(`execute if entity @s[${INANIMATES}] run tag @s add d3o2d4o5W6A1`).then(() => {
            if (target.hasTag("d3o2d4o5W6A1")) {
                system.run(() => {
                    target.setOnFire(8);
                    target.runCommandAsync(`playsound fire.fire @a[r=8] ~ ~ ~ 1 1 1`);
                    target.runCommandAsync(`particle dodo_ta:flamebrand_01_target_1 ~ ~ ~`);
                    target.runCommandAsync(`particle dodo_ta:flamebrand_01_target_2 ~ ~ ~`);
                    target.runCommandAsync(`tag @s remove d3o2d4o5W6A1`);
                })
            }
        })
    });

    player.runCommandAsync(`playanimation @s animation.dodo_ta.fire_armblade.player`);
    player.runCommandAsync(`playsound mob.blaze.shoot @a[r=8] ~ ~ ~ 1 0.55 1`);
    player.runCommandAsync(`particle dodo_ta:fire_armblade_use ~ ~ ~`);
}

export function dragonfang(player) {
    const { x, y, z } = player.location;
    const damage = 5;
    const radius = 8;

    for (let i = 0; i < 4; i++) {
        system.runTimeout(() => {
            player.runCommandAsync(`execute positioned ${x} ${y} ${z} run execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:dragonfang}] if entity @s[${INANIMATES}] run damage @s ${damage}`);
        }, i * 20);
    }

    player.runCommandAsync(`playanimation @s animation.dodo_ta.dragonfang.player`);
    player.runCommandAsync(`playsound mob.enderdragon.growl @a[r=8] ~ ~ ~ 0.3 1.5 0.3`);
    player.runCommandAsync(`particle dodo_ta:dragonfang_use ~ ~ ~`);
}

export function katana(player) {
    player.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 1.2 1`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.katana.player`);
    player.runCommandAsync(`particle dodo_ta:katana_use ~ ~ ~`);
    player.runCommandAsync(`effect @s resistance 120 99 true`);
    system.run(() => {    
        player.applyKnockback(0, 0, 0, 2.25);
    })
    system.runTimeout(() => {
        player.setDynamicProperty("dodo_ta_katana_jump", true);
    }, 5)
}

export function endWand(player) {
    const passableBlocks = [
        'minecraft:air',
        'minecraft:water',
        'minecraft:grass',
        'minecraft:tall_grass',
        'minecraft:seagrass',
        'minecraft:torch',
        'minecraft:vine',
        'minecraft:cave_vines',
        'minecraft:cave_vines_body_with_berries',
        'minecraft:cave_vines_head_with_berries',
        'minecraft:twisting_vines',
        'minecraft:weeping_vines',
        'minecraft:ladder',
        'minecraft:deadbush',
        'minecraft:kelp',
        'minecraft:wheat',
        'minecraft:carrots',
        'minecraft:potatoes',
        'minecraft:beetroot'
    ];

    const foundBlock = player.getBlockFromViewDirection({ maxDistance: 64 });

    if (!foundBlock) {
        player.runCommandAsync(`playsound random.pop @s ~ ~ ~ 0.75 1 0.75`);
        player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"translate":"dodo.studios.ta.end_wand.no_block"}]}`);
        return;
    }

    const { x, y, z } = foundBlock.block.location;
    let safeLocation;

    let newY = y + 1;
    while (newY < 256) {
        const currentBlock = world.getDimension(player.dimension.id).getBlock({x, y: newY, z});
        const blockAbove = world.getDimension(player.dimension.id).getBlock({x, y: newY + 1, z});

        if (passableBlocks.includes(currentBlock.typeId) && passableBlocks.includes(blockAbove.typeId)) {
            safeLocation = {x, y: newY, z};
            break;
        }

        newY++;
    }

    if (!safeLocation) {
        player.runCommandAsync(`playsound random.pop @s ~ ~ ~ 0.75 1 0.75`);
        player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"translate":"dodo.studios.ta.end_wand.cant_teleport"}]}`);
        return;
    }

    player.runCommandAsync(`playanimation @s animation.dodo_ta.end_wand.player`);
    player.runCommandAsync(`particle dodo_ta:end_wand_use_1 ~ ~ ~`);
    player.runCommandAsync(`playsound block.chorusflower.grow @a[r=8] ~ ~ ~ 1 1.2 1`);
    player.runCommandAsync(`playsound mob.endermen.portal @a[r=8] ~ ~ ~ 1 1 1`);
    player.runCommandAsync(`teleport @s ${safeLocation.x} ${safeLocation.y} ${safeLocation.z}`);
    player.runCommandAsync(`particle dodo_ta:end_wand_use_2 ~ ~ ~`);
    player.runCommandAsync(`playsound block.chorusflower.grow @a[r=8] ~ ~ ~ 1 0.8 1`);
    player.runCommandAsync(`playsound mob.endermen.portal @a[r=8] ~ ~ ~ 1 1 1`);
}

export function doubleAxe(player) {
    const damage = 8;
    const radius = 5;
    player.runCommandAsync(`playsound item.trident.hit @a[r=8] ~ ~ ~ 1 0.4 1`);
    player.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 0.8 1`);
    player.runCommandAsync(`playanimation @s animation.dodo_ta.double_axe.player`);
    player.runCommandAsync(`execute as @e[r=${radius}] unless entity @s[name="${player.name}",hasitem={item=dodo_ta:double_axe,location=slot.weapon.mainhand}] if entity @s[${INANIMATES}] run damage @s ${damage} entity_attack entity "${player.name}"`);
    player.runCommandAsync(`particle dodo_ta:double_axe_use_1 ~ ~ ~`);
    player.runCommandAsync(`particle dodo_ta:double_axe_use_2 ~ ~ ~`);
}