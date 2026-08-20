import { system, world } from "@minecraft/server";

import { INANIMATES } from '../main.js';
import * as weaponUse from './use.js';
import * as weaponHit from './hit.js';
import * as weaponBreak from './break.js';
import * as weaponKill from './kill.js';
import './tick.js';

const weaponUseFunctions = {
    'golden_trident': weaponUse.goldenTrident,
    'warhammer': weaponUse.warhammer,
    'spear': weaponUse.spear,
    'magic_wand': weaponUse.magicWand,
    'flamebrand_00': weaponUse.flameBrandA,
    'flamebrand_01': weaponUse.flameBrandB,
    'fire_armblade': weaponUse.fireArmblade,
    'dragonfang': weaponUse.dragonfang,
    'katana': weaponUse.katana,
    'end_wand': weaponUse.endWand,
    'double_axe': weaponUse.doubleAxe
};

const weaponHitFunctions = {
    'flamebrand_01': weaponHit.flameBrandB,
    'venomstrike': weaponHit.venomStrike,
    'dagger': weaponHit.dagger,
    'great_hammer': weaponHit.greatHammer,
    'villager_claymore': weaponHit.villagerClaymore,
    'end_wand': weaponHit.endWand
};

const weaponKillFunctions = {
    'spear': weaponKill.spear,
    'scythe': weaponKill.scythe,
    'scimitar': weaponKill.scimitar,
    'villager_claymore': weaponKill.villagerClaymore
};

world.beforeEvents.itemUse.subscribe((event) => {
    const item = event.itemStack.typeId;
    const player = event.source;
    const itemId = item.replace(`dodo_ta:`, '');

    if (weaponUseFunctions[itemId]) {
        const cooldown = player.getItemCooldown(`dodo_ta_${itemId}`);
        if (!cooldown) {
            weaponUseFunctions[itemId](player);
        }
    }
});

world.afterEvents.entityHurt.subscribe((event) => {
    const attacker = event.damageSource.damagingEntity;
    const target = event.hurtEntity;

    if (attacker && attacker.typeId === `minecraft:player`) {
        const equippableComponent = attacker.getComponent("equippable");
        if (equippableComponent) {
            const mainhandEquipment = equippableComponent.getEquipment("Mainhand");
            if (mainhandEquipment) {
                const item = mainhandEquipment.typeId.replace(`dodo_ta:`, '');
                if (weaponHitFunctions[item]) {
                    weaponHitFunctions[item](target, attacker);
                } else if (item === 'copper_sword_00' || item === 'copper_sword_01' || item === 'copper_sword_02') {
                    weaponHit.copperSword(item, attacker)
                }
            }
        }
    }
});

world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const block = event.block;
    const player = event.player;

    const equippableComponent = player.getComponent("equippable");
    if (equippableComponent) {
        const mainHand = equippableComponent.getEquipment("Mainhand");
        if (mainHand) {
            const item = mainHand.typeId.replace(`dodo_ta:`, '');
            if (item === 'sickle') {
                weaponBreak.sickle(block, player);
            }
        }
    }
});

world.afterEvents.entityDie.subscribe((event) => {
    const target = event.deadEntity;
    const attacker = event.damageSource.damagingEntity;

    if (attacker && attacker.typeId === `minecraft:player`) {
        const equippableComponent = attacker.getComponent("equippable");
        if (equippableComponent) {
            const mainHand = equippableComponent.getEquipment("Mainhand");
            if (mainHand) {
                const item = mainHand.typeId.replace(`dodo_ta:`, '');
                if (weaponKillFunctions[item]) {
                    weaponKillFunctions[item](target, attacker);
                } else if (item === 'battle_axe') {
                    weaponKill.battleAxe(attacker)
                }
            }
        }
    }
});

function checkPlayerWeapon() {
    for (const player of world.getPlayers()) {
        const equippableComponent = player.getComponent("equippable");
        if (equippableComponent) {
            const mainHand = equippableComponent.getEquipment("Mainhand")

            if (mainHand && mainHand.typeId === `dodo_ta:golden_trident`) {
                player.setDynamicProperty("dodo_ta_golden_trident", true);
                player.runCommandAsync(`effect @s water_breathing 62 0 true`);
            } else if (player.getDynamicProperty("dodo_ta_golden_trident")) {
                player.setDynamicProperty("dodo_ta_golden_trident", false);
                player.runCommandAsync(`effect @s water_breathing 0`);
            }

            if (mainHand && mainHand.typeId === `dodo_ta:warhammer`) {
                if (player.isOnGround && player.getDynamicProperty("dodo_ta_warhammer_jump")) {
                    player.setDynamicProperty("dodo_ta_warhammer_jump", false);
                    warhammerLand(player);
                }
            } else if (player.getDynamicProperty("dodo_ta_warhammer_jump")) {
                player.setDynamicProperty("dodo_ta_warhammer_jump", false);
            }

            if (mainHand && mainHand.typeId === `dodo_ta:club`) {
                player.setDynamicProperty("dodo_ta_club", true);
            } else if (player.getDynamicProperty("dodo_ta_club")) {
                player.setDynamicProperty("dodo_ta_club", false);
                player.runCommandAsync(`effect @s speed 0`);
                player.runCommandAsync(`effect @s strength 0`);
                player.runCommandAsync(`effect @s regeneration 0`);
                player.runCommandAsync(`effect @s resistance 0`);
            }

            if (mainHand && mainHand.typeId === `dodo_ta:battle_axe`) {
                player.setDynamicProperty("dodo_ta_battle_axe", true);
            } else if (player.getDynamicProperty("dodo_ta_battle_axe")) {
                player.setDynamicProperty("dodo_ta_battle_axe", false);
                player.setDynamicProperty("dodo_ta_battle_axe_time", 0);
                player.setDynamicProperty("dodo_ta_battle_axe_spree", 0);
                player.runCommandAsync(`effect @s speed 0`);
                player.runCommandAsync(`effect @s strength 0`);
            }

            if (mainHand && mainHand.typeId === `dodo_ta:katana`) {
                player.setDynamicProperty("dodo_ta_katana", true);
                player.runCommandAsync(`effect @s speed 62 2 true`);
                player.runCommandAsync(`effect @s jump_boost 62 4 true`);
                if (player.isOnGround && player.getDynamicProperty("dodo_ta_katana_jump")) {
                    player.setDynamicProperty("dodo_ta_katana_jump", false);
                    player.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 0.8 1`);
                    player.runCommandAsync(`particle dodo_ta:katana_use ~ ~ ~`);
                    player.runCommandAsync(`effect @s resistance 0`);
                }
            } else if (player.getDynamicProperty("dodo_ta_katana")) {
                player.runCommandAsync(`effect @s resistance 0`);
                if (player.getDynamicProperty("dodo_ta_katana_jump")) {
                    player.runCommandAsync(`effect @s resistance 4 99 true`);
                }
                player.setDynamicProperty("dodo_ta_katana", false);
                player.setDynamicProperty("dodo_ta_katana_jump", false);
                player.runCommandAsync(`effect @s speed 0`);
                player.runCommandAsync(`effect @s jump_boost 0`);
            }
        }
    }
};

function warhammerLand(player) {
    const playerPos = player.location;
    const radius = 6;

    const entities = world.getDimension(player.dimension.id).getEntities({
        location: playerPos,
        maxDistance: radius
    });

    entities.forEach(target => {
        if (target === player) return;
        if (target.typeId === "minecraft:item") return;

        const targetPos = target.location;

        const dx = targetPos.x - playerPos.x;
        const dz = targetPos.z - playerPos.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        const maxDistance = radius;
        const minDistance = 1;
        const maxKnockback = 4;
        const minKnockback = 3;

        let knockbackStrength = minKnockback;
        if (distance <= maxDistance && distance >= minDistance) {
            knockbackStrength = maxKnockback - ((maxKnockback - minKnockback) * ((distance - minDistance) / (maxDistance - minDistance)));
        } else if (distance < minDistance) {
            knockbackStrength = maxKnockback;
        }

        const horizontalStrength = knockbackStrength;
        const verticalStrength = 1.0;

        system.run(() => {
            try {
                target.runCommandAsync(`damage @s[${INANIMATES}] 10`);
                target.applyKnockback(dx, dz, horizontalStrength, verticalStrength);
            } catch (e) {
                return;
            }
        })
    });

    player.runCommandAsync(`playsound random.explode @a[r=16] ~ ~ ~ 0.7 0.7 0.7`);
    player.runCommandAsync(`playsound random.explode @a[r=8] ~ ~ ~ 1.2 0.7 1.2`);
    player.runCommandAsync(`camerashake add @a[r=16] 0.1 0.3 positional`);
    player.runCommandAsync(`camerashake add @a[r=8] 0.25 0.3 positional`);
    player.runCommandAsync(`particle dodo_ta:warhammer_use_2 ~ ~ ~`);
    player.runCommandAsync(`particle dodo_ta:warhammer_use_3 ~ ~ ~`);
}

system.runInterval(checkPlayerWeapon, 1);