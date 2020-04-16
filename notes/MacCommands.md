# Issue - port is already open

[Kill process](https://superuser.com/questions/451032/how-to-kill-a-process-by-port-on-macos-a-la-fuser-k-9000-tcp)

You can see if a port if open by this command

 ```
 sudo lsof -i :4200
```
```
// Output
Password:
COMMAND     PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node      32584 TheUser   30u  IPv4 0x54dc41fd1eee2f97      0t0  TCP localhost:4200 (LISTEN)
node      32584 TheUser   48u  IPv4 0x59dc41fd84ee94e7      0t0  TCP localhost:4200->localhost:54179 (ESTABLISHED)
Google    52505 TheUser   28u  IPv4 0x58dc41fd94ee778f      0t0  TCP localhost:54179->localhost:4200 (ESTABLISHED)
 ```
where `4200` is the port number

If the port is open, it should return a string containing the Process ID (PID).

Copy this PID and

```
kill -9 PID
```

```
// example
kill -9 32584
```