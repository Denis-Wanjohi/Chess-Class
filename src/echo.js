import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useUserStore } from "./stores/user";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: "v2nwkhecyeabupc5gbzf",
    wsHost: "127.0.0.1",
    wsPort: 8080,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    },
});

export default  echo;