import React, { useEffect,useState } from 'react'
import * as API from '../../api'
import { IHashtag,ISummary } from '../../api/interfaces';
import { Card, SubNavbar, Pagination, CircularImage} from '../../components';
import './scss/SearchSummaryView.scss'
import moment from 'moment'
import 'moment/locale/ko';
import {Link} from 'react-router-dom';


const SearchSummaryView = () => {
    
    const [ post, setPost ] = useState<ISummary[]>([]);
    const [ items, setItems  ] = useState<any[]>([]);
    const [ keyword,setKeyword] = useState('');
    const [hashTags, setHashTags] = useState<IHashtag[]>([]);
	const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    
    const fn = async() => {
        const responce = await API.Search.fetchSummaries(keyword) as any;
        setPost(responce.data);
    }
    


    useEffect(() => {
        fn();
    }, []);

    const Search = {
        search: () => {
            if ( keyword === "" ) {
                alert("검색어를 입력해주세요");
                return;
            }
            else {
                fn();
            }
        }
    }

    return(
        <>
        <div className = "summary-search-container">
                <div className = "search-bar-wrap">
                    <div className = "saerch-input-bar">
                        <input className = "search-input"  
                        placeholder="검색어를 입력하시오" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}/> 
                        <button className = "search-button" onClick={fn}><img className= "search-but-img" src="https://i.pinimg.com/originals/e7/d4/50/e7d450d8c31ae10aa663d082fdbb3db9.png"></img></button>
                    </div>
                <div className = "__search-navbar_wrap">
                    <SubNavbar className="__search-navbar" links={
                        [
                        { to: '/search', text:''},
                        { to: '/search/topic/', text: '기사 검색' },
                        { to: '/search/summary/', text: '글 검색' }
                        ]
                    } 
                        />
                </div>
            </div>
            <div className = "search-content-container">
                <div className = "search-content-container-wrap">
                    {
                        post.map((item:ISummary) => {
                            return (
                                
                                <div className="search-card">
                                    <Link className ="__user-link"   to={`/summary/${item._id}`}>
                                    <Card>
                                        <div className="user-information-wrap">
                                       <div className="user-img-wrap">
                                           <CircularImage className="main-slider-author-profile" url={item.user.profile}/></div>
                                            <p className="user-name">{item.user.username} </p>
                                        </div>

                                            <p className="news-title">{item.article.title}</p>

                                        <div className="search-Hashtag">
                                            <div className="serch-Hashtag-text-wrap">
                                            {item.hashtags.length > 0 ? (
                                                
                                                item.hashtags.map(( hashtag ) => (
                                                    <p  className="hashtags-text">#{hashtag.text}</p>
                                                ))):(
                                                    <p className="hashtags-case-2">등록된 해시태그가 없습니다</p>
                                                )
                                                }
                                            </div>

                                        </div>
                                        <div className="new-time-wrap">
                                            <p className="new-write-time">{item.timestamp}소요</p>
                                            <p className="news-create-time">{moment(item.createdAt).fromNow()}</p>
                                        </div>
                                    </Card> 
                                </Link>
                                </div>
                               
                            );
                        })
                        }
                </div>
            </div>
            <div className = "search-pagination-wrap">
                <Pagination page={page}  total = {total} itemsPerPage={6}/>
            </div>
        </div>
        </>
    )
}

export default SearchSummaryView;


