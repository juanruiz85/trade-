export function sickle(block, player) {
    const crops = [
        'minecraft:wheat',
        'minecraft:potatoes',
        'minecraft:carrots',
        'minecraft:beetroot'
    ];
    
    let placeCrop = block.typeId;
    if (crops.includes(block.typeId) && block.permutation.getState('growth') === 7) {
        const { x, y, z } = block.location;
        player.runCommandAsync(`setblock ${x} ${y} ${z} ${placeCrop} [] destroy`);
        player.runCommandAsync(`particle dodo_ta:sickle_use_1 ${x} ${y} ${z}`);
        player.runCommandAsync(`particle dodo_ta:sickle_use_2 ${x} ${y} ${z}`);
        player.runCommandAsync(`playsound dig.cave_vines @a[r=8] ${x} ${y} ${z} 1 0.75 1`);
    }
}