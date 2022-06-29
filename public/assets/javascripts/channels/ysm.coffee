App.loan = App.cable.subscriptions.create "YsmChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log("connected");

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    logfin_toast(data["name"],data["group_name"],data["customer_name"],data["step_content"],data["uid"],data["created"]);
    
    # Called when there's incoming data on the websocket for this channel
