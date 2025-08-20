export const courseMock = Array.from({ length: 10 }, (_, i) => ({
  id: `course_00${i + 1}`,
  title: `دوره ${i + 1}`,
  image: `/common/images2.jpg`,
  start_date: '1404/05/01',
  time: 30,
  level: 'beginner',
  teachers: [
    {
      first_name: 'علی',
      last_name: 'محمدی',
    },
  ],
  price: 1500000,
  final_price: 1200000,
}));
