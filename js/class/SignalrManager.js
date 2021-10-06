class SignalrManager
{
    
    async connectToServer(ip, hub, command, callback)
    {
        let connection = new signalR.HubConnectionBuilder().withUrl(`http://${ip}/${hub}`).withAutomaticReconnect(
            {
                nextRetryDelayInMilliseconds: retryContext => 
                {
                    if (retryContext.elapsedMilliseconds < 60000)
                    {
                        // If we've been reconnecting for less than 60 seconds so far,
                        // wait between 0 and 10 seconds before the next reconnect attempt.
                        return Math.random() * 10000;
                    }
                    else
                    {
                        // If we've been reconnecting for more than 60 seconds so far, stop reconnecting.
                        return null;
                    }
                }
            }
        ).build();
        
        connection.start().then(
            function ()
            {
                console.log(`Connection to ${hub} made.`);
            }
        ).catch(
            function (err)
            {
                return console.error(err.toString());
            }
        );
        
        return new Promise(
            (resolve) =>
            {
                resolve(connection);
            }
        );
    }
}