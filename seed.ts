import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create sample hotels
  const hotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: 'فندق الجزائر الفاخر',
        description: 'فندق فاخر بإطلالة رائعة على البحر المتوسط، يقع في قلب العاصمة الجزائرية',
        shortDescription: 'فندق فاخر في قلب الجزائر العاصمة',
        address: 'شارع Didouche Mourad, الجزائر العاصمة',
        city: 'الجزائر العاصمة',
        country: 'الجزائر',
        postalCode: '16000',
        latitude: 36.7538,
        longitude: 3.0588,
        phone: '+213 555 123 456',
        email: 'info@luxuryhotel-alger.dz',
        website: 'https://luxuryhotel-alger.dz',
        starRating: 5,
        propertyType: 'HOTEL',
        checkInTime: '15:00',
        checkOutTime: '11:00',
        featured: true,
        verified: true,
        priceRange: 'LUXURY',
        amenities: [
          'واي فاي مجاني',
          'مسبح خارجي',
          'مركز لياقة',
          'مطعم فاخر',
          'سبا',
          'خدمة غرف 24/7',
          'مواقف سيارات',
          'إطلالة على البحر',
          'تكييف مركزي',
          'مركز أعمال',
        ],
        images: [
          '/images/hotels/hotel-1-main.jpg',
          '/images/hotels/hotel-1-room.jpg',
          '/images/hotels/hotel-1-restaurant.jpg',
          '/images/hotels/hotel-1-pool.jpg',
        ],
        policies: {
          cancellation: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
          pets: 'غير مسموح باصطحاب الحيوانات الأليفة',
          smoking: 'منطقة التدخين المخصصة',
          children: 'الأطفال مرحب بهم',
          wifi: 'واي فاي مجاني في جميع أنحاء الفندق',
        },
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'منتجع وهران海滨',
        description: 'منتجع شاطئي فاخر على ساحل البحر الأبيض المتوسط مع خدمات متكاملة',
        shortDescription: 'منتجع شاطئي فاخر في وهران',
        address: 'Boulevard Mohamed V, وهران',
        city: 'وهران',
        country: 'الجزائر',
        postalCode: '31000',
        latitude: 35.6969,
        longitude: -0.6370,
        phone: '+213 555 234 567',
        email: 'resort@oran-beach.dz',
        website: 'https://oran-beach-resort.dz',
        starRating: 4,
        propertyType: 'RESORT',
        checkInTime: '15:00',
        checkOutTime: '11:00',
        featured: true,
        verified: true,
        priceRange: 'LUXURY',
        amenities: [
          'شاطئ خاص',
          'مسبح لا نهائي',
          'نادي أطفال',
          'رياضات مائية',
          'مطعم海边',
          'سبا وعلاج',
          'ملعب غولف',
          'واي فاي مجاني',
          'مواقف مجانية',
        ],
        images: [
          '/images/hotels/resort-1-main.jpg',
          '/images/hotels/resort-1-beach.jpg',
          '/images/hotels/resort-1-pool.jpg',
          '/images/hotels/resort-1-room.jpg',
        ],
        policies: {
          cancellation: 'إلغاء مجاني حتى 48 ساعة قبل الوصول',
          pets: 'مسموح بحجز الحيوانات الأليفة',
          smoking: 'غير مسموح في جميع المناطق الداخلية',
          children: 'مرحب بالأطفال مع برامج ترفيهية',
          wifi: 'واي فاي عالي السرعة مجاني',
        },
      },
    }),
    prisma.hotel.create({
      data: {
        name: 'فندق قسنطينة royal',
        description: 'فندق عصري في قلب مدينة قسنطينة التاريخية مع خدمات خمس نجوم',
        shortDescription: 'فندق عصري في قسنطينة',
        address: 'شارع حسيبة بن بوعلي, قسنطينة',
        city: 'قسنطينة',
        country: 'الجزائر',
        postalCode: '25000',
        latitude: 36.3650,
        longitude: 6.6147,
        phone: '+213 555 345 678',
        email: 'hotel@constantine-royal.dz',
        website: 'https://constantine-royal.dz',
        starRating: 4,
        propertyType: 'HOTEL',
        checkInTime: '14:00',
        checkOutTime: '12:00',
        featured: false,
        verified: true,
        priceRange: 'MODERATE',
        amenities: [
          'مركز ville التاريخية',
          'مطعم تراثي',
          'واي فاي مجاني',
          'مواقف سيارات',
          'خدمة الاستقبال',
          'قاعة مؤتمرات',
          'تكييف',
        ],
        images: [
          '/images/hotels/hotel-2-main.jpg',
          '/images/hotels/hotel-2-room.jpg',
          '/images/hotels/hotel-2-lobby.jpg',
        ],
        policies: {
          cancellation: 'إلغاء مجاني حتى 24 ساعة قبل الوصول',
          pets: 'غير مسموح',
          smoking: 'مسموح في المناطق المخصصة',
          children: 'مرحب بالأطفال',
          wifi: 'واي فاي مجاني',
        },
      },
    }),
  ])

  console.log(`✅ Created ${hotels.length} hotels`)

  // Create rooms for each hotel
  for (const hotel of hotels) {
    const rooms = await Promise.all([
      prisma.room.create({
        data: {
          hotelId: hotel.id,
          name: 'جناح فاخر',
          description: 'جناح واسع مع إطلالة بانورامية على المدينة',
          roomType: 'SUITE',
          maxGuests: 4,
          bedConfiguration: ' سرير كبير + أريكة',
          roomSize: 45,
          basePrice: 15000,
          discountPrice: 12000,
          totalRooms: 5,
          bookedRooms: 0,
          features: ['إطلالة بانورامية', 'شرفة خاصة', 'جاكوزي', 'خدمة غرف فاخرة'],
          amenities: ['واي فاي مجاني', 'تكييف', 'تلفزيون ذكي', 'ميني بار', 'خزنة'],
          images: ['/images/rooms/suite-1.jpg', '/images/rooms/suite-2.jpg'],
        },
      }),
      prisma.room.create({
        data: {
          hotelId: hotel.id,
          name: 'غرفة مزدوجة',
          description: 'غرفة مريحة ومناسبة للعائلات',
          roomType: 'DOUBLE',
          maxGuests: 2,
          bedConfiguration: 'سرير مزدوج',
          roomSize: 25,
          basePrice: 10000,
          totalRooms: 20,
          bookedRooms: 0,
          features: ['إطلالة على الحديقة', 'حمام فاخر', 'مساحة عمل'],
          amenities: ['واي فاي مجاني', 'تكييف', 'تلفزيون', 'تلفون'],
          images: ['/images/rooms/double-1.jpg', '/images/rooms/double-2.jpg'],
        },
      }),
      prisma.room.create({
        data: {
          hotelId: hotel.id,
          name: 'غرفة مفردة',
          description: 'غرفة أنيقة للمسافرين المنفردين',
          roomType: 'SINGLE',
          maxGuests: 1,
          bedConfiguration: 'سرير مفرد',
          roomSize: 18,
          basePrice: 7000,
          totalRooms: 15,
          bookedRooms: 0,
          features: ['مساحة عمل مريحة', 'حمام حديث', 'إطلالة جميلة'],
          amenities: ['واي فاي مجاني', 'تكييف', 'تلفزيون'],
          images: ['/images/rooms/single-1.jpg'],
        },
      }),
    ])

    console.log(`✅ Created ${rooms.length} rooms for ${hotel.name}`)
  }

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'أحمد محمد علي',
        email: 'ahmed.mohamed@email.com',
        role: 'USER',
        phone: '+213 555 111 222',
        nationality: 'جزائري',
        preferredCurrency: 'DZD',
        loyaltyPoints: 1250,
        totalBookings: 3,
        verified: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'فاطمة بنت محمد',
        email: 'fatima.bent.mohamed@email.com',
        role: 'USER',
        phone: '+213 555 333 444',
        nationality: 'جزائري',
        preferredCurrency: 'DZD',
        loyaltyPoints: 850,
        totalBookings: 1,
        verified: false,
      },
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create sample reviews
  const firstHotel = hotels[0]
  const firstRoom = await prisma.room.findFirst({
    where: { hotelId: firstHotel.id },
  })

  if (firstRoom) {
    const review = await prisma.review.create({
      data: {
        userId: users[0].id,
        hotelId: firstHotel.id,
        rating: 5,
        title: 'تجربة رائعة ومميزة',
        comment: 'خدمة ممتازة وإطلالة خلابة على البحر. مطعم رائع وغرفة فاخرة جداً. أنصح الجميع بهذا الفندق الرائع.',
        images: ['/images/reviews/review-1.jpg'],
        verified: true,
      },
    })

    console.log('✅ Created sample review')
  }

  // Create loyalty program
  const loyaltyTransactions = await Promise.all([
    prisma.loyaltyTransaction.create({
      data: {
        userId: users[0].id,
        type: 'EARNED',
        points: 500,
        description: 'نقاط من الحجز الأول',
      },
    }),
    prisma.loyaltyTransaction.create({
      data: {
        userId: users[0].id,
        type: 'BONUS',
        points: 750,
        description: 'نقاط ترحيب بالمستخدم الجديد',
      },
    }),
  ])

  console.log(`✅ Created ${loyaltyTransactions.length} loyalty transactions`)

  // Create referral code for first user
  await prisma.referralCode.create({
    data: {
      userId: users[0].id,
      code: 'AHMED2024',
      maxUses: 10,
      usedCount: 0,
      rewardPoints: 500,
    },
  })

  console.log('✅ Created referral code')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })