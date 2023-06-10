export default function AnswerChatSupport({ isYou, content, author }) {

    return (
        <div className="chat-message">
            <div className={`flex items-end ${isYou ? "justify-end" : ""}`}>
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                        <span className={`px-4 py-2 text-base rounded-lg inline-block ${isYou ? "text-white rounded-br-none" : "bg-gray-300 text-gray-600 rounded-bl-none"}`} style={{ background: isYou ? "var(--gradient)" : "" }}>
                            {content}
                        </span>
                    </div>
                </div>
                <img src={`https://auth.frazionz.net/skins/face.php?u=${author.id}`} alt={`author_answer${author.id}`} className={`w-6 h-6 rounded-full ${isYou ? "order-2" : "order-1"}`} />
            </div>
        </div>
    )

}