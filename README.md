# hotel-api

- taski aldik 
    - `git checkout -b <branchName>` 
        * bunun kesinlikle dev branchinden olusturulmasi gerekiyor
        * dev herzaman guncel oldugundan baska yerden acilan branch ile guncel degisiklikler gorulemez
    
    -  oncelikle dev branchine gecmek lazim `git checkout dev`
        - ! sonra  pull req yapmadan once - `git merge <kendiBranchIsmimiz>`
        - sonra kendi branchimizi dev branchine localimizde merge ediyoruz
        - sebebi asil merge i yapmadan once localimizde bizim branch ile dev branchi arasinda conflict varmi diye bakmak.
        - yani kendimiz conflict varmi diye baktik (dev branchine gectik, localde kendi branchimizi ona merge ettik )
        - conflict varsa, onu coz daha sonra pull requesti olustur.

    - conflictleri cozduketen sonra pull requesti github uzerinden olusturuyoruz


</br>____________________________
    `git fetch -p`                    => clouddaki guncel branchlerio ceker </br>
    `git branch -d initial-files`     => localdeki branchleri siler</br>
    `git checkout <branchName>`       => bir branche gecmek</br>


    - takslarimiz
        - model
        - controller
        - router
        - dbConnection

    Beyza   - user         -> model,controller,router
    Soner   - reservation  -> model,controller,router
    Omer    - room         -> model,controller,router
    ibrahim - authentication,login,logout,token ve tablosu
    * dbConnection -> herkes yapacak, conflict ciksin!