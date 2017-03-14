package house

class Post {

    String senderName
    String title
    String text
    Date date

    static belongsTo = Person
    static hasMany = [receivers: Person]


    static constraints = {
        receivers nullable: true
    }
}
