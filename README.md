# hotel-api

- task aldik 
    1- `git checkout -b <branchName>` 
        * bunun kesinlikle dev branchinden olusturulmasi gerekiyor
        * dev herzaman guncel oldugundan baska yerden acilan branch ile guncel degisiklikler gorulemez
    
    2-  oncelikle dev branchine gecmek lazim `git checkout dev`
        ! sonra  pull req yapmadan once - `git merge <kendiBranchIsmimiz>`
        * sonra kendi branchimizi dev branchine localimizde merge ediyoruz
        -> sebebi asil merge i yapmadan once localimizde bizim branch ile dev branchi arasinda conflict varmi diye bakmak.
        -> yani kendimiz conflict varmi diye baktik (dev branchine gectik, localde kendi branchimizi ona merge ettik )
        -> conflict varsa, onu coz daha sonra pull requesti olustur.

    3- conflictleri cozduketen sonra pull requesti github uzerinden olusturuyoruz