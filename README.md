# auxledger-draco-client
#How to Set Up

Steps :

1 -> Clone the github repository 
git clone https://github.com/auxesisgroup/auxledger-draco-client

2 -> Copy the path of the ‘app’ folder inside the auxledger-draco-client ( ‘/resources/app/’ )
	
Hint : If your auxledger-draco-client path is “/home/ubuntu/auxledger-draco-client” then the path is “/home/ubuntu/auxledger-draco-client/resources/app/”

3 -> Set the ‘app’ path in ‘AUXNET’ environment variables by command as below :

    a) For Terminal (System restart not required)

	$ echo 'export AUXNET=<app-path>' >> ~/.bashrc

    b) For UI (System restart required*)

	$ sudo su
	$ sudo echo 'AUXNET=<app-path>' >> /etc/environment

	* System restart required for application to work from UI

4 -> Now you run the app via terminal or via UI

    a) Terminal
	Go to the downloaded repository path and run :
	$ ./aux_client
    b) UI
	Go to the downloaded repository path and run aux_client application.

5 -> Once you are in the application you can start and connect with different blockchain networks.



