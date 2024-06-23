export default [
    {
        name: "room",
        type: "glbModel",
        path: "/models/Pieza.glb", //IMPORTANTE, la ruta tiene que ser específicamente como está escrita(con la extensión)
        //En este caso, mi modelo es Pieza.glb, así tiene que ir escrita, de lo contrario dará error
    },
    {
        name: "screen",
        type: "videoTexture",
        path: "/textures/coding.mp4",
    },
    {
        name: "foo",
        type: "videoTexture",
        path: "/textures/kda.mp4",
    },
];