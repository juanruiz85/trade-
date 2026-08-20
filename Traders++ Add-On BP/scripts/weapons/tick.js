import { system, world } from "@minecraft/server";

function club() {
    for (const player of world.getPlayers()) {
        if (player.getDynamicProperty("dodo_ta_club") === true) {
            const healthComponent = player.getComponent("health");
            if (healthComponent) {
                const health = healthComponent.currentValue;
                const previousHealth = player.getDynamicProperty("dodo_ta_club_previous_health") || healthComponent.value;
                const sound = "playsound mob.evocation_fangs.attack @a ~ ~ ~ 1 2.5 1";

                if (health <= 4) {
                    player.runCommandAsync(`effect @s speed 1 3 true`);
                    player.runCommandAsync(`effect @s strength 1 2 true`);
                    player.runCommandAsync(`effect @s regeneration 1 2 true`);
                    player.runCommandAsync(`effect @s resistance 1 2 true`);
                    if (previousHealth > 4) {
                        player.runCommandAsync(`${sound}`);
                        player.runCommandAsync(`particle dodo_ta:club_use ~ ~ ~`);
                    }
                } else if (health <= 8) {
                    player.runCommandAsync(`effect @s speed 1 2 true`);
                    player.runCommandAsync(`effect @s strength 1 1 true`);
                    player.runCommandAsync(`effect @s regeneration 1 0 true`);
                    if (previousHealth > 8) {
                        player.runCommandAsync(`${sound}`);
                        player.runCommandAsync(`particle dodo_ta:club_use ~ ~ ~`);
                    }
                } else if (health <= 12) {
                    player.runCommandAsync(`effect @s speed 1 1 true`);
                    player.runCommandAsync(`effect @s strength 1 1 true`);
                    if (previousHealth > 12) {
                        player.runCommandAsync(`${sound}`);
                        player.runCommandAsync(`particle dodo_ta:club_use ~ ~ ~`);
                    }
                } else if (health <= 16) {
                    player.runCommandAsync(`effect @s speed 1 0 true`);
                    player.runCommandAsync(`effect @s strength 1 0 true`);
                    if (previousHealth > 16) {
                        player.runCommandAsync(`${sound}`);
                        player.runCommandAsync(`particle dodo_ta:club_use ~ ~ ~`);
                    }
                } else if (health <= 19) {
                    player.runCommandAsync(`effect @s speed 1 0 true`);
                    if (previousHealth > 19) {
                        player.runCommandAsync(`${sound}`);
                        player.runCommandAsync(`particle dodo_ta:club_use ~ ~ ~`);
                    }
                }

                player.setDynamicProperty("dodo_ta_club_previous_health", health)
            }
        }
    }
}

function venomStrike() {
    const players = world.getPlayers();
    if (players.length > 0) {
        const player = players[0];
        player.runCommandAsync(`execute as @e[tag=dyoLd1o7W9A3] at @s run particle dodo_ta:venomstrike_target ~ ~ ~`);
    }
}

function battleAxe() {
    for (const player of world.getPlayers()) {
        if (player.getDynamicProperty("dodo_ta_battle_axe_time")) {
            const timeLeft = player.getDynamicProperty("dodo_ta_battle_axe_time");

            if (timeLeft > 1) {
                player.setDynamicProperty("dodo_ta_battle_axe_time", timeLeft - 1);
                player.runCommandAsync(`particle dodo_ta:battle_axe_use ~ ~ ~`);
            } else {
                player.setDynamicProperty("dodo_ta_battle_axe_time", 0);
                player.setDynamicProperty("dodo_ta_battle_axe_spree", 0)
            }
        }
    }
}

system.runInterval(club, 10);
system.runInterval(venomStrike, 2);
system.runInterval(battleAxe, 2);