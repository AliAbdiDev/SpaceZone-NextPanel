import { AvatarCustom } from '@/core/components/custom/ui/AvatarCustom';
import RateStar from '@/core/components/custom/ui/RateStars';

function Comments() {
  return (
    <>
      <ul className=" space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <li className="space-y-4 max-w-5xl gap-5 w-full bg-white rounded-xl p-4" key={index}>
            <span>
              <RateStar rateNumber={index + 0.5} />
            </span>
            <p className="description-section">
              موضوعات متنوعی تو این دوره پوشش داده شده. مدرس هم فضای تدریس رو طوری طراحی کرده که کد نویسی بامزه باشه نه
              ترسناک. یادگیری این دوره رو شدیدا توصیه می‌کنم.👌👌😎
            </p>
            <div className=" flex items-center  gap-5">
              <AvatarCustom src="/avatar-img.png" className="size-16 border-[3px] border-white !shadow-md" />
              <p className="text-xl font-semibold">مجتبی محمدزاده</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="wfull flex items-center justify-center ">
        <button className="underline text-lg font-semibold text-primary">مشاهده بیشتر نظرات</button>
      </div>
    </>
  );
}

export default Comments;
