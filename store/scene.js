export const state = () => ({
    cameraPos: {
        x: 0, 
        y: 0,
        z: 10,
    },
    cameraLookAtPos: {
        x: 0, 
        y: 0,
        z: 0,
    }
})

export const getters = {
}

export const mutations = {
    setCameraPos(state, { x,  y, z }) {
        state.cameraPos.x = x;
        state.cameraPos.y = y;
        state.cameraPos.z = z;
    },
    setCameraLookAtPos(state, { x,  y, z }) {
        state.cameraLookAtPos.x = x;
        state.cameraLookAtPos.y = y;
        state.cameraLookAtPos.z = z;
    }
}

export const actions = {
}

export default  {
    state,
    getters,
    mutations,
    actions
}