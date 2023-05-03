import { useState } from "react"

export default function CandidateComponentPaginate({ funcParse, category }) {

    const [prevPageUrl, setPrevPageUrl] = useState(category.candids.prev_page_url)
    const [currentPage, setCurrentPage] = useState(category.candids.current_page)
    const [nextPageUrl, setNextPageUrl] = useState(category.candids.next_page_url)

    async function changePage(action) {
        setPrevPageUrl(null)
        setNextPageUrl(null)
        funcParse.setLoading(category.id, true).then(async () => {
            let newPage = (action == 'prev') ? currentPage - 1 : currentPage + 1
            let result = await axios.get('/candidate/paginate/' + category.id + '/' + newPage)
            if (result.status == 200) {
                setPrevPageUrl(result.data.prev_page_url)
                setNextPageUrl(result.data.next_page_url)
                setCurrentPage(newPage)
                funcParse.setPageCategory(category.id, result.data)
            }
            funcParse.setLoading(category.id, false)
        })
    }


    return (
        <>
            {category.candids.last_page > 1 &&
                <div className="paginate candidate">
                    <button className="btn" onClick={() => { changePage('prev') }} disabled={(prevPageUrl == null)}>{`<`}</button>
                    <button className="btn">{currentPage}</button>
                    <button className="btn" onClick={() => { changePage('next') }} disabled={(nextPageUrl == null)}>{`>`}</button>
                </div>
            }
        </>

    )

}