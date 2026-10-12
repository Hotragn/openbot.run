### Fixed

- A remote connection comes back within seconds when its Signal session expires. Before, OpenBot treated the expiry as a rate limit, waited 60 seconds, and showed "Too many connection attempts", about every 47 minutes.
