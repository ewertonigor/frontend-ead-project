import { CourseType, EpisodeType } from '@/src/services/courseService'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

interface props {
  episode: EpisodeType
  course: CourseType
}

const EpisodeList = function ({ episode, course }: props) {

  const router = useRouter()

  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)

    const seconds = totalSeconds % 60

    function toString (num: number) {
      return num.toString().padStart(2, '0')
    }

    const result = `${toString(minutes)}:${toString(seconds)}`

    return result
  }

  const handleEpisodePlayer = () => {
    router.push(`/course/episode/${episode.order - 1}?courseid=${course.id}&episodeid=${episode.id}`)
  }

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio N° {episode.order}</p>
          <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>{episode.synopsis} Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima doloremque deserunt in blanditiis dolores, impedit exercitationem suscipit, reiciendis corrupti, animi sapiente saepe nisi magnam fugiat! Hic ea minima, accusantium exercitationem eius dolorem accusamus possimus, eveniet id, commodi amet dolor eos nihil iste itaque aliquid. Non consequuntur repellendus pariatur voluptatibus reprehenderit. <br /> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ipsum.</p>
        </div>
      </div>
    </>
  )
}

export default EpisodeList
