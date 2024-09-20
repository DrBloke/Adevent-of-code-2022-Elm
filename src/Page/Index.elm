module Page.Index exposing (view)

import Accessibility as Html exposing (Html)
import Components.Notification as Notification
import Html.Attributes as Attributes
import Route
import Types


view : Maybe String -> Html msg
view notification =
    Html.div [ Attributes.class "index" ]
        (Notification.view notification
            :: List.map
                (\config ->
                    Html.div [] [ Html.a [ Attributes.href (Types.identifier config) ] [ Html.text (Types.title config) ] ]
                )
                Route.allConfigs
        )
