# Torch Helmet Mining Trader
execute as @e[type=dodo_ta:mining_trader] at @s run fill ~1 ~2 ~1 ~-1 ~0 ~-1 air [] replace light_block_15
execute as @e[type=dodo_ta:mining_trader,tag=!zQ9mtNOTYmgn] at @s run fill ~ ~1 ~ ~ ~1 ~ light_block_15 [] replace air

# Secret Deals Force Field
execute as @e[type=dodo_ta:secret_deals_trader] at @s if entity @e[family=monster,r=3] run particle dodo_ta:secret_deals_use ~ ~0.5 ~
execute as @e[type=dodo_ta:secret_deals_trader] at @s if entity @e[family=monster,r=3] run execute as @e[family=monster,r=3] at @s run particle dodo_ta:secret_deals_target ~ ~0.5 ~
execute as @e[type=dodo_ta:secret_deals_trader] at @s if entity @e[family=monster,r=3] run execute as @e[family=monster,r=3] at @s run damage @s 8 override entity @e[type=dodo_ta:secret_deals_trader,c=1]