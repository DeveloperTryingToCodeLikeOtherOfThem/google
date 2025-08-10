namespace google.controller { 
   export let _players: controller.Controller[]

    game.addScenePopHandler(() => {
        const stateWhenPushed = game.currentScene().controllerConnectionState;
        if (!stateWhenPushed)
            return;
        for (let i = 0; i < stateWhenPushed.length; i++) {
            const p = _players[i];
            if (p && (!!stateWhenPushed[i] != !!p.connected)) {
                // connection state changed while in another scene; raise the event.
                control.raiseEvent(
                    p.id,
                    p.connected ? ControllerEvent.Connected : ControllerEvent.Disconnected
                );
            }
        }

    })
    game.addScenePushHandler(oldScene => {
        oldScene.controllerConnectionState = [];
        for (let i = 0; i < _players.length; i++) {
            if (_players[i]) {
                oldScene.controllerConnectionState[i] = _players[i].connected;
            }
        }
})}

