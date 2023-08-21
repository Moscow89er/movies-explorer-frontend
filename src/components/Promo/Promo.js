import promoLogo from '../../images/promo_logo.svg'

function Promo () {
    const handleScrollToNextomponent = () => {
        const nextElement = document.querySelector('.promo').nextElementSibling;

        if (nextElement) {
            window.scrollTo({
                top: nextElement.offsetTop,
                behavior: "smooth"
            })
        }
    }

    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__elements">
                    <div className="promo__text">
                        <h2 className="promo__title">Учебный проект студента факультета Веб-разработки.</h2>
                        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    </div>
                    <button className="promo__button" onClick={handleScrollToNextomponent}>Узнать больше</button>
                </div>
                <img className="promo__logo" src={promoLogo} alt="Изображение сгрупированных слов Web в виде земного шара" />
            </div>
        </section>
    )
}

export default Promo;