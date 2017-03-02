package cs2212b.proj

class Person {

    String  firstName
    String  lastName
    String  subId
    String  email

    static constraints = {
        subId size: 2..50, unique: true
        //email email: true, blank:false
    }

}
