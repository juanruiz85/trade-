export function scythe(target) {
    if (target.getComponent("is_baby")) {
        return
    } else {
        if (target.typeId === `minecraft:armadillo` || target.typeId === `minecraft:axolotl` || target.typeId === `minecraft:bee` || target.typeId === `minecraft:camel` || target.typeId === `minecraft:cat` || target.typeId === `minecraft:chicken` || target.typeId === `minecraft:cow` || target.typeId === `minecraft:donkey` || target.typeId === `minecraft:fox` || target.typeId === `minecraft:goat` || target.typeId === `minecraft:horse` || target.typeId === `minecraft:llama` || target.typeId === `minecraft:mooshroom` || target.typeId === `minecraft:mule` || target.typeId === `minecraft:ocelot` || target.typeId === `minecraft:panda` || target.typeId === `minecraft:pig` || target.typeId === `minecraft:rabbit` || target.typeId === `minecraft:sheep` || target.typeId === `minecraft:sniffer` || target.typeId === `minecraft:trader_llama` || target.typeId === `minecraft:turtle` || target.typeId === `minecraft:villager` || target.typeId === `minecraft:wolf`) {
            target.runCommandAsync(`summon ${target.typeId} ~ ~ ~ ~ ~ minecraft:entity_born`);
            target.runCommandAsync(`particle dodo_ta:scythe_target ~ ~ ~`);
            target.runCommandAsync(`particle minecraft:heart_particle ~ ~0.5 ~`);
            target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 1.2 1`);
        } else if (target.typeId === `minecraft:frog`) {
            target.runCommandAsync(`summon minecraft:tadpole ~ ~ ~ ~ ~`);
            target.runCommandAsync(`particle dodo_ta:scythe_target ~ ~ ~`);
            target.runCommandAsync(`particle minecraft:heart_particle ~ ~0.5 ~`);
            target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 1.2 1`);
        } else if (target.typeId === `minecraft:villager_v2`) {
            target.runCommandAsync(`summon minecraft:villager ~ ~ ~ ~ ~ minecraft:entity_born`);
            target.runCommandAsync(`particle dodo_ta:scythe_target ~ ~ ~`);
            target.runCommandAsync(`particle minecraft:heart_particle ~ ~0.5 ~`);
            target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 1.2 1`);
        } 
    }
}

export function spear(target) {
    const dropChance = Math.random();
    if (dropChance <= 0.05 && target.typeId === `minecraft:skeleton`) {
        target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/spear_1"`);
        target.runCommandAsync(`particle dodo_ta:spear_target ~ ~ ~`);
        target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 0.8 1`);
    } else if (dropChance <= 0.05 && target.typeId === `minecraft:zombie`) {
        target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/spear_2"`);
        target.runCommandAsync(`particle dodo_ta:spear_target ~ ~ ~`);
        target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 0.8 1`);
    } else if (dropChance <= 0.03 && target.typeId === `minecraft:creeper`) {
        target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/spear_3"`);
        target.runCommandAsync(`particle dodo_ta:spear_target ~ ~ ~`);
        target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 0.8 1`);
    } else if (target.typeId === `minecraft:ender_dragon`) {
        target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/spear_4"`);
        target.runCommandAsync(`particle dodo_ta:spear_target ~ ~ ~`);
        target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 0.8 1`);
    } else if (dropChance <= 0.1 && target.typeId === `minecraft:piglin`) {
        target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/spear_5"`);
        target.runCommandAsync(`particle dodo_ta:spear_target ~ ~ ~`);
        target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 1 0.8 1`);
    }
}

export function scimitar(target) {
    if (Math.random() < 0.6) {
        target.runCommandAsync(`playsound vr.stutterturn @a[r=8] ~ ~ ~ 0.75 0.7 0.75`);
        target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/scimitar"`);
        target.runCommandAsync(`particle dodo_ta:scimitar_target`);
    }
}

export function battleAxe(attacker) {
    let kills = attacker.getDynamicProperty("dodo_ta_battle_axe_spree") || 0;
    kills++;

    attacker.setDynamicProperty("dodo_ta_battle_axe_spree", kills);

    const effectTime = 10;

    const soundVolume = kills > 5 ? 0.6 : 1;
    const soundPitch = kills > 5 ? 2 : 1.5;
    attacker.runCommandAsync(`playsound random.break @a[r=8] ~ ~ ~ ${soundVolume} ${soundPitch} ${soundVolume}`);

    const effectLevel = Math.min(kills - 1, 4);
    attacker.runCommandAsync(`effect @s speed ${effectTime} ${effectLevel} true`);
    attacker.runCommandAsync(`effect @s strength ${effectTime} ${effectLevel} true`);
    
    attacker.setDynamicProperty("dodo_ta_battle_axe_time", effectTime * 10)
}

export function villagerClaymore(target) {
    target.runCommandAsync(`playsound note.pling @a[r=8] ~ ~ ~ 0.35 2 0.35`);
    target.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/villager_claymore"`);
    target.runCommandAsync(`particle dodo_ta:villager_claymore_target ~ ~ ~`);
}