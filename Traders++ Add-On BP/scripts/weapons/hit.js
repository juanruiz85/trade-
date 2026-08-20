import { system  } from "@minecraft/server";

export function flameBrandB(target) {
    target.setOnFire(10);
    target.runCommandAsync(`particle dodo_ta:flamebrand_01_target_1 ~ ~ ~`);
    target.runCommandAsync(`particle dodo_ta:flamebrand_01_target_2 ~ ~ ~`);
}

export function venomStrike(target) {
    let effectTime = 4;
    target.runCommandAsync(`effect @s fatal_poison ${effectTime} 3 true`);
    target.addTag("dyoLd1o7W9A3");
    system.runTimeout(() => {
        try {
            if (target.isValid()) {
                target.removeTag("dyoLd1o7W9A3");
            }
        } catch (e) {
            return;
        }
    }, effectTime * 20);
}

export function dagger(target) {
    if (Math.random() < 0.4) {
        target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 0.75 0.85 0.75`);
        target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/dagger"`);
        target.runCommandAsync(`particle dodo_ta:dagger_target`);
    }
}

export function greatHammer(target, attacker) {
    const attackerPos = attacker.location;
    const targetPos = target.location;

    const dx = targetPos.x - attackerPos.x;
    const dz = targetPos.z - attackerPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const maxDistance = 5;
    const minDistance = 1;
    const maxKnockback = 8;
    const minKnockback = 3;

    let knockbackStrength = minKnockback;
    if (distance <= maxDistance && distance >= minDistance) {
        knockbackStrength = maxKnockback - ((maxKnockback - minKnockback) * ((distance - minDistance) / (maxDistance - minDistance)));
    } else if (distance < minDistance) {
        knockbackStrength = maxKnockback;
    }

    const horizontalStrength = knockbackStrength;
    const verticalStrength = 1.0;

    target.runCommandAsync(`playsound item.trident.riptide_1 @a[r=8] ~ ~ ~ 0.6 1.5 0.6`);
    target.runCommandAsync(`playsound ambient.weather.lightning.impact @a[r=8] ~ ~ ~ 0.04 2.5 0.04`);
    target.runCommandAsync(`particle dodo_ta:great_hammer_target ~ ~ ~`);
    target.applyKnockback(dx, dz, horizontalStrength, verticalStrength);
}

export function villagerClaymore(target) {
    if (target.typeId === `minecraft:zombie` || target.typeId === `minecraft:zombie_villager` || target.typeId === `minecraft:zombie_villager_v2`) {
        const summonEntity = target.getComponent("is_baby") ? 
            "summon villager ~ ~ ~ ~ ~ minecraft:entity_born" : 
            "summon villager ~ ~ ~ ~ ~";

        target.runCommandAsync(summonEntity);
        target.runCommandAsync(`particle dodo_ta:villager_claymore_use_1 ~ ~ ~`);
        target.runCommandAsync(`particle dodo_ta:villager_claymore_use_2 ~ ~ ~`);
        target.runCommandAsync(`playsound mob.villager.yes @a[r=8] ~ ~ ~ 1 1 1`);
        target.runCommandAsync(`teleport @s ~ 500 ~`);
        system.runTimeout(() => {
            try {
                if (target.isValid()) {
                    target.runCommandAsync(`teleport @s ~ -100 ~`);
                 }
              } catch (e) {
                return;
            }
        }, 1)
    }
}

export function copperSword(item, attacker) {
    const randomOxidize = Math.random();
    if (randomOxidize <= 0.025 && item === `copper_sword_02`) {
        attacker.runCommandAsync(`playsound use.copper @a[r=8] ~ ~ ~ 1 1.2 1`);
        attacker.runCommandAsync(`execute if entity @s[hasitem={item=dodo_ta:copper_sword_02,location=slot.weapon.mainhand}] run replaceitem entity @s slot.weapon.mainhand 0 dodo_ta:copper_sword_03`);
        attacker.runCommandAsync(`particle dodo_ta:copper_sword_use_3`);
    } else if (randomOxidize <= 0.075 && item === `copper_sword_01`) {
        attacker.runCommandAsync(`playsound use.copper @a[r=8] ~ ~ ~ 1 1.2 1`);
        attacker.runCommandAsync(`execute if entity @s[hasitem={item=dodo_ta:copper_sword_01,location=slot.weapon.mainhand}] run replaceitem entity @s slot.weapon.mainhand 0 dodo_ta:copper_sword_02`);
        attacker.runCommandAsync(`particle dodo_ta:copper_sword_use_2`);
    } else if (randomOxidize <= 0.15 && item === `copper_sword_00`) {
        attacker.runCommandAsync(`playsound use.copper @a[r=8] ~ ~ ~ 1 1.2 1`);
        attacker.runCommandAsync(`execute if entity @s[hasitem={item=dodo_ta:copper_sword_00,location=slot.weapon.mainhand}] run replaceitem entity @s slot.weapon.mainhand 0 dodo_ta:copper_sword_01`);
        attacker.runCommandAsync(`particle dodo_ta:copper_sword_use_1`);
    }
}

export function endWand(target) {
    target.runCommandAsync(`particle dodo_ta:end_wand_use_1 ~ ~-0.5 ~`);
    target.runCommandAsync(`playsound mob.endermen.portal @a[r=8] ~ ~ ~ 1 1 1`);
    target.runCommandAsync(`spreadplayers ~ ~ 16 24 @s`);
    target.runCommandAsync(`particle dodo_ta:end_wand_use_2 ~ ~-0.5 ~`);
    target.runCommandAsync(`playsound mob.endermen.portal @a[r=8] ~ ~ ~ 1 1 1`);
}