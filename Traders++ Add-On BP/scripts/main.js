import { system, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

import './weapons/eventListener.js';
import './weapons/addLores.js';
export const INANIMATES = "type=!boat,type=!chest_boat,type=!minecart,type=!chest_minecart,type=!tnt_minecart,type=!hopper_minecart,type=!command_block_minecart,type=!item,type=!xp_orb,type=!arrow,type=!thrown_trident,type=!snowball,type=!egg,type=!llama_spit,type=!ender_pearl,type=!eye_of_ender_signal,type=!fireworks_rocket,type=!tnt,type=!falling_block,type=!fishing_hook,type=!lightning_bolt,type=!leash_knot,type=!painting,type=!armor_stand,type=!wither_skull,type=!wither_skull_dangerous,type=!dragon_fireball,type=!evocation_fang"; // excludes fireball, small_fireball, shulker_bullet, ender_crystal

import './rainbowItems.js';
import './megaItems.js';

world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;

    if (player.getDynamicProperty("dodo_ta_last_version") === undefined) {
        system.runTimeout(() => {
            player.setDynamicProperty("dodo_ta_last_version", 1);
            player.runCommandAsync("gamerule sendcommandfeedback false");
            player.runCommandAsync(`loot spawn ~ ~ ~ loot "dodo/ta/guide_item"`);
            player.sendMessage({ translate: "dodo.studios.traders_addon.empty" });
            player.sendMessage({ translate: "dodo.studios.traders_addon.welcome", with: [player.name] });
            player.sendMessage({ translate: "dodo.studios.traders_addon.empty" });
        }, 2 * 20);
    }
});

world.beforeEvents.itemUse.subscribe((event) => {
    const item = event.itemStack.typeId;
    const player = event.source;

    if (item && item === "dodo_ta:settings") {
        const cooldown = player.getItemCooldown("dodo_ta_settings");
        if (!cooldown) {
            settingsMenu(player)
        }
    }

    if (item && item === "dodo_ta:levels_10") {
        const cooldown = player.getItemCooldown("dodo_ta_levels_10");
        if (!cooldown) {
            player.runCommandAsync("/clear @s dodo_ta:levels_10 -1 1");
            player.runCommandAsync("/xp 10L");
            player.runCommandAsync("/playsound random.levelup @a[r=8] ~ ~ ~ 1 1.2 1");
        }
    }

    if (item && item === "dodo_ta:levels_100") {
        const cooldown = player.getItemCooldown("dodo_ta_levels_100");
        if (!cooldown) {
            player.runCommandAsync("/clear @s dodo_ta:levels_100 -1 1");
            player.runCommandAsync("/xp 100L");
            player.runCommandAsync("/playsound random.levelup @a[r=8] ~ ~ ~ 1 0.7 1");
        }
    }

    if (item && item === "dodo_ta:exp_bag_small") {
        const cooldown = player.getItemCooldown("dodo_ta_exp_bag_small");
        if (!cooldown) {
            player.runCommandAsync("/clear @s dodo_ta:exp_bag_small -1 1");
            player.runCommandAsync("/xp 200");
            player.runCommandAsync("/playsound random.levelup @a[r=8] ~ ~ ~ 1 1.5 1");
        }
    }

    if (item && item === "dodo_ta:exp_bag_large") {
        const cooldown = player.getItemCooldown("dodo_ta_exp_bag_large");
        if (!cooldown) {
            player.runCommandAsync("/clear @s dodo_ta:exp_bag_large -1 1");
            player.runCommandAsync("/xp 750");
            player.runCommandAsync("/playsound random.levelup @a[r=8] ~ ~ ~ 1 0.9 1");
        }
    }

    if (item && item === "dodo_ta:warden_sword") {
        const cooldown = player.getItemCooldown("dodo_ta_warden_sword");
        if (!cooldown) {
            wardenSwordUse(player)
        }
    }
});

world.afterEvents.entitySpawn.subscribe(event => {
    const entity = event.entity;

    if (entity.typeId.includes("dodo_ta:") && entity.typeId.includes("_trader")) {
        const nearbyPlayers = world.getDimension(entity.dimension.id).getEntities({
            location: entity.location,
            maxDistance: 16,
            type: "minecraft:player"
        });
        
        const spawnTraderName = entity.typeId.replace(/^dodo_ta:/, '').replace(/_trader$/, '');
        const spawnTraderSetting = world.getDynamicProperty(`spawn_${spawnTraderName}`);

        const spawnIntensity = world.getDynamicProperty("spawn_intensity") ?? 100;

        if (nearbyPlayers.length > 0) {
            entity.runCommandAsync("event entity @s dodo_ta:standby");
        } else if (spawnTraderSetting === false) {
            entity.runCommandAsync("event entity @s minecraft:instant_despawn");
        } else {
            const randomChance = Math.random() * 100;
            if (randomChance < spawnIntensity) {
                entity.runCommandAsync("event entity @s dodo_ta:standby");
                
                const nearbyVillagers = world.getDimension(entity.dimension.id).getEntities({
                    location: entity.location,
                    maxDistance: 64,
                    type: "minecraft:villager_v2"
                });
                if (!(entity.typeId === "dodo_ta:mega_villager_trader") && nearbyPlayers.length <= 0 && nearbyVillagers.length > 1) {
                    if (Math.random() <= 0.7) {
                        entity.runCommandAsync("summon dodo_ta:mega_villager_trader ~ ~ ~");
                        entity.runCommandAsync("spreadplayers ~ ~ 0 8 @e[type=dodo_ta:mega_villager_trader,c=1] ~");
                        entity.runCommandAsync("execute as @e[type=villager,c=1,r=48] at @s run spreadplayers ~ ~ 0 16 @e[type=dodo_ta:mega_villager_trader,c=1,r=64] ~");
                    }
                }
            } else {
                entity.runCommandAsync("event entity @s minecraft:instant_despawn");
            }
        }
    }

    if ((entity.typeId.includes("dodo_ta:furniture") && !entity.typeId.includes("_trader")) || entity.typeId === "dodo_ta:treasure_chest" || (entity.typeId.includes("dodo_ta:")) && entity.typeId.includes("_plushie") || (entity.typeId.includes("dodo_ta:vehicles") && !entity.typeId.includes("_trader"))) {
        const entityYaw = entity.getRotation().y;
        let roundedYaw = undefined;
        roundedYaw = Math.round(entityYaw / 45) * 45;
        entity.runCommandAsync(`teleport @s ~ ~ ~ ${roundedYaw} 0`);
    }
});

world.afterEvents.entityDie.subscribe(event => {
    const entity = event.deadEntity;

    if (entity.typeId === "dodo_ta:mining_trader") {{
        entity.runCommandAsync("tag @s add zQ9mtNOTYmgn");
        entity.runCommandAsync("fill ~3 ~3 ~3 ~-3 ~-3 ~-3 minecraft:air [] replace minecraft:light_block_15")
    }}

    if (entity.typeId === "minecraft:player" && entity.getDynamicProperty("torch_helmet")) {{
        entity.runCommandAsync("fill ~3 ~3 ~3 ~-3 ~-3 ~-3 minecraft:air [] replace minecraft:light_block_15")
    }}
});

system.afterEvents.scriptEventReceive.subscribe(event => {
    const { sourceEntity, id, message } = event;

    try {
        if (!(sourceEntity.typeId.includes("dodo_ta:furniture") && !sourceEntity.typeId.includes("_trader") || sourceEntity.typeId === "dodo_ta:treasure_chest" || sourceEntity.typeId.includes("dodo_ta:") && sourceEntity.typeId.includes("_plushie") || sourceEntity.typeId.includes("dodo_ta:vehicles") && !sourceEntity.typeId.includes("_trader"))) return;

        let objectShaken = undefined;
        objectShaken = sourceEntity.getDynamicProperty("dodo_ta:object");
    
        if (id === "dodo_ta:object" && message === "shake" && !objectShaken) {
            sourceEntity.runCommandAsync("playanimation @s animation.dodo_ta.object.shake");
            sourceEntity.setDynamicProperty("dodo_ta:object", true);
            system.runTimeout(() => {
                try {
                    sourceEntity.setDynamicProperty("dodo_ta:object", false);
                } catch (e) {}
            }, 30)
            return;
        }
        
        if ((id === "dodo_ta:object" && message === "shake" && objectShaken) || (id === "dodo_ta:object" && message === "despawn" && !objectShaken)) {
            sourceEntity.setDynamicProperty("dodo_ta:object", true);
            sourceEntity.runCommandAsync(`loot spawn ~ ~0.1 ~ loot "dodo/ta/object/${sourceEntity.typeId.split(":")[1]}"`);
            sourceEntity.runCommandAsync("playsound camera.take_picture @a[r=8] ~ ~ ~ 1 1.25 1");
            sourceEntity.runCommandAsync("particle dodo_ta:object_remove ~ ~ ~");
            if (sourceEntity.typeId.includes("dresser")) {
                sourceEntity.runCommandAsync("event entity @s dodo_ta:invisible");
                sourceEntity.runCommandAsync("kill @s");
            } else {
                sourceEntity.runCommandAsync("event entity @s minecraft:instant_despawn");
            }
        }
    } catch (e) {}
});

system.runInterval(wardenArmor, 1);
function wardenArmor() {
    for (const player of world.getPlayers()) {
        const isSneaking = player.isSneaking;
        const hasWardenArmorProperty = player.getDynamicProperty("warden_armor");

        const requiredArmor = ["dodo_ta:warden_helmet", "dodo_ta:warden_chestplate", "dodo_ta:warden_leggings", "dodo_ta:warden_boots"];
        const isWearingWardenArmor = ["Head", "Chest", "Legs", "Feet"].every((slot, i) => player.getComponent("equippable")?.getEquipment(slot)?.typeId === requiredArmor[i]);

        if (isSneaking && isWearingWardenArmor && !hasWardenArmorProperty) {
            wardenArmorSneak(player);
            player.setDynamicProperty("warden_armor", true);
        } else if ((!isSneaking || !isWearingWardenArmor) && hasWardenArmorProperty) {
            wardenArmorReset(player);
            player.setDynamicProperty("warden_armor", false);
        }
    }
}

world.afterEvents.itemCompleteUse.subscribe(event => {
    const item = event.itemStack.typeId;
    const player = event.source;

    if (item === "dodo_ta:warden_apple") {
        wardenAppleEat(player);
    }
});

function wardenArmorSneak(player) {
    player.setDynamicProperty("warden_armor", true);
    player.runCommandAsync("playsound break.sculk @a ~ ~ ~ 1 1.5 1");
    player.runCommandAsync("particle dodo_ta:warden_armor_1 ~ ~ ~");
    player.runCommandAsync("particle dodo_ta:warden_armor_2 ~ ~ ~");
    player.runCommandAsync(`playanimation @s animation.dodo_ta.warden_armor.invisible animation.dodo_ta.warden_armor.visible 0 "!query.is_sneaking"`);
    player.runCommandAsync("effect @s invisibility 9999 0 true");
}

function wardenArmorReset(player) {
    player.setDynamicProperty("warden_armor", false);
    player.runCommandAsync("playsound break.sculk @a ~ ~ ~ 1 1.2 1");
    player.runCommandAsync("particle dodo_ta:warden_armor_1 ~ ~ ~");
    player.runCommandAsync("particle dodo_ta:warden_armor_2 ~ ~ ~");
    player.runCommandAsync("effect @s invisibility 0");
}

function wardenAppleEat(player) {
    player.runCommandAsync("particle dodo_ta:warden_apple ~ ~ ~");
    player.runCommandAsync("playsound power.on.sculk_sensor @a ~ ~ ~ 1 1.5 1");
    player.runCommandAsync("effect @s speed 180 2 true");
    player.runCommandAsync("effect @s jump_boost 180 1 true");
    player.runCommandAsync("effect @s strength 180 1 true");
    player.runCommandAsync("effect @s haste 180 2 true");
    player.runCommandAsync("effect @s regeneration 180 2 true");
    player.runCommandAsync("effect @s instant_health 1 99 true");
    player.runCommandAsync("effect @s absorption 180 4 true");
    player.runCommandAsync("effect @s resistance 180 2 true");
    player.runCommandAsync("effect @s fire_resistance 180 0 true");
    player.runCommandAsync("effect @s night_vision 180 0 true");
}

export function wardenSwordUse(player) {
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
        system.run(() => {
            try {
                target.applyKnockback(dx, dz, horizontalStrength, verticalStrength);
            } catch (e) {
                return;
            }
        })
    });

    player.runCommandAsync("playanimation @s animation.dodo_ta.warden_sword.player");
    player.runCommandAsync("playsound mob.warden.attack @a[r=8] ~ ~ ~ 1 1.25 1");
    player.runCommandAsync("particle dodo_ta:warden_sword_1 ~ ~ ~");
    player.runCommandAsync("particle dodo_ta:warden_sword_2 ~ ~ ~");
    player.runCommandAsync("particle dodo_ta:warden_sword_3 ~ ~ ~");
    player.runCommandAsync("particle dodo_ta:warden_sword_4 ~ ~ ~");
}

system.runInterval(wardenTotem, 1);
function wardenTotem() {
    for (const player of world.getPlayers()) {
        const mainHand = player.getComponent("equippable")?.getEquipment("Mainhand");
        const offHand = player.getComponent("equippable")?.getEquipment("Offhand");

        const wardenTotemActive = player.getDynamicProperty("warden_totem");

        if ((mainHand && mainHand.typeId === "dodo_ta:warden_totem") || (offHand && offHand.typeId === "dodo_ta:warden_totem")) {
            if (!wardenTotemActive) {
                player.runCommandAsync("particle dodo_ta:warden_totem ~ ~ ~");
                player.runCommandAsync("playsound place.sculk @a[r=8] ~ ~ ~ 1 1.2 1");
                player.runCommandAsync("effect @s health_boost infinite 4 true");
                player.runCommandAsync("effect @s instant_health 1 3 true");
                player.setDynamicProperty("warden_totem", true);
            }
        } else if (wardenTotemActive) {
            player.runCommandAsync("effect @s health_boost 0");
            player.runCommandAsync("particle dodo_ta:warden_totem ~ ~ ~");
            player.runCommandAsync("playsound place.sculk @a[r=8] ~ ~ ~ 1 0.8 1");
            player.setDynamicProperty("warden_totem", false);
        }
    }
}

let playerTickCounters = new Map();
system.runInterval(diamondClock, 1);
function diamondClock() {
    for (const player of world.getPlayers()) {
        const mainHand = player.getComponent("equippable")?.getEquipment("Mainhand");
        const offHand = player.getComponent("equippable")?.getEquipment("Offhand");

        const playerId = player.id;

        if (!playerTickCounters.has(playerId)) {
            playerTickCounters.set(playerId, 0);
        }

        const tickCounter = playerTickCounters.get(playerId);
        const diamondClockActive = player.getDynamicProperty("diamond_clock");

        if (diamondClockActive && tickCounter >= 20) {
            player.runCommandAsync("playsound random.click @s ~ ~ ~ 0.5 2 0.5");
            playerTickCounters.set(playerId, 0);
        } else {
            playerTickCounters.set(playerId, tickCounter + 1);
        }

        if (diamondClockActive) {
            player.runCommandAsync("time add 100");
        }

        if ((mainHand && mainHand.typeId === "dodo_ta:diamond_clock") || (offHand && offHand.typeId === "dodo_ta:diamond_clock")) {
            if (!diamondClockActive) {
                player.runCommandAsync("playsound random.click @s ~ ~ ~ 1 1.75 1");
                player.setDynamicProperty("diamond_clock", true);
            }
        } else if (diamondClockActive) {
            player.runCommandAsync("playsound random.click @s ~ ~ ~ 0.75 1.5 0.75");
            playerTickCounters.set(playerId, 0);
            player.setDynamicProperty("diamond_clock", false);
        }
    }
}

function settingsMenu(player) {
    const properties = [
        { name: "spawn_intensity", default: 100, type: "slider", options: [0, 100, 1] },
        { name: "spawn_enchanting", default: true, type: "toggle" },
        { name: "spawn_end", default: true, type: "toggle" },
        { name: "spawn_farmer", default: true, type: "toggle" },
        { name: "spawn_fast_food", default: true, type: "toggle" },
        { name: "spawn_furniture", default: true, type: "toggle" },
        { name: "spawn_mega_villager", default: true, type: "toggle" },
        { name: "spawn_mini_blocks", default: true, type: "toggle" },
        { name: "spawn_mining", default: true, type: "toggle" },
        { name: "spawn_nature", default: true, type: "toggle" },
        { name: "spawn_nether", default: true, type: "toggle" },
        { name: "spawn_ocean", default: true, type: "toggle" },
        { name: "spawn_op", default: true, type: "toggle" },
        { name: "spawn_plushies", default: true, type: "toggle" },
        { name: "spawn_rainbow", default: true, type: "toggle" },
        { name: "spawn_redstone", default: true, type: "toggle" },
        { name: "spawn_secret_deals", default: true, type: "toggle" },
        { name: "spawn_traveler", default: true, type: "toggle" },
        { name: "spawn_vehicles", default: true, type: "toggle" },
        { name: "spawn_warden", default: true, type: "toggle" },
        { name: "spawn_weapons", default: true, type: "toggle" }
    ];

    system.run(() => {
        let settingsMenu = new ModalFormData().title({ translate: "dodo.studios.ta.settings.title" });
        const currentValues = [];

        for (const prop of properties) {
            const currentValue = world.getDynamicProperty(prop.name) ?? prop.default;
            currentValues.push(currentValue);
            if (prop.type === "slider") {
                settingsMenu.slider({ translate: `dodo.studios.ta.settings.${prop.name}`, with: ['\n'] }, ...prop.options, currentValue);
            } else if (prop.type === "toggle") {
                settingsMenu.toggle({ translate: `entity.dodo_ta:${prop.name.replace("spawn_", "")}_trader.name` }, currentValue);
            }
        }
    
        settingsMenu.show(player).then((r) => {
            if (r.canceled) {
                player.runCommandAsync("playsound random.pop @s ~ ~ ~ 0.75 1 0.75");
                player.sendMessage({ translate: "dodo.studios.ta.settings.not_saved" });
                return;
            }

            const changesAreMade = r.formValues?.some((value, index) => value !== currentValues[index]);

            if (changesAreMade) {
                r.formValues.forEach((value, index) => {
                    world.setDynamicProperty(properties[index].name, value);
                });
                player.runCommandAsync("playsound note.pling @a ~ ~ ~ 0.75 2 0.75");
                world.sendMessage({ translate: "dodo.studios.ta.settings.updated", with: [player.name] });
                if (r.formValues.slice(1).every(value => value === false)) {
                    world.sendMessage({ translate: "dodo.studios.ta.settings.disabled.all_traders" });
                } else if (r.formValues[0] === 0) {
                    world.sendMessage({ translate: "dodo.studios.ta.settings.disabled.spawn_intensity" });
                }
            }
        });
    });
}

system.runInterval(torchHelmet, 1);
function torchHelmet() {
    for (const player of world.getPlayers()) {
        const hasTorchHelmetProperty = player.getDynamicProperty("torch_helmet");

        const requiredArmor = ["dodo_ta:torch_helmet"];
        const isWearingTorchHelmet = ["Head"].every((slot, i) => player.getComponent("equippable")?.getEquipment(slot)?.typeId === requiredArmor[i]);
        
        if (hasTorchHelmetProperty) {
            player.runCommandAsync("fill ~3 ~3 ~3 ~-3 ~-3 ~-3 minecraft:air [] replace minecraft:light_block_15");
            player.runCommandAsync("fill ~ ~1 ~ ~ ~1 ~ minecraft:light_block_15 [] replace minecraft:air");
        }

        if (isWearingTorchHelmet && !hasTorchHelmetProperty) {
            player.runCommandAsync("playsound block.lantern.hit @s ~ ~ ~ 1 1.2 1");
            player.setDynamicProperty("torch_helmet", true);
        } else if (!isWearingTorchHelmet && hasTorchHelmetProperty) {
            player.runCommandAsync("playsound block.lantern.break @s ~ ~ ~ 1 1.2 1");
            player.runCommandAsync("fill ~3 ~3 ~3 ~-3 ~-3 ~-3 minecraft:air [] replace minecraft:light_block_15");
            player.setDynamicProperty("torch_helmet", false);
        }
    }
}