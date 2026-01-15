import { Language, KeywordTooltip } from '../types';

interface Translation {
	'main-title': string;
	'code-title': string;
	'variables-title': string;
	'summary-title': string;
	start: string;
	step: string;
	reset: string;
	speed: string;
	'current-iteration': string;
	clickToStart: string;
	'hover-hint': string;
	'debug-controls-hint': string;
	'variables-hint': string;
	keywords: Record<string, KeywordTooltip>;
	summary: {
		title: string;
		overview: string;
		steps: string[];
		final: string;
		explanation: string;
	};
	stepExplanations: {
		init: string;
		loop: string;
		check: string;
		add: string;
		skip: string;
		complete: string;
	};
}

export const translations: Record<Language, Translation> = {
	en: {
		'main-title': '🎓 Learn to Code!',
		'code-title': '📝 The Code',
		'variables-title': '💾 Variables',
		'summary-title': '🎯 What Does This Code Do?',
		start: 'Start',
		step: 'Next Step',
		reset: 'Reset',
		speed: 'Speed:',
		'current-iteration': 'Current Iteration',
		clickToStart: '👆 Click Start to begin!',
		'hover-hint': '💡 **Tip:** Click on colored keywords in the code to see detailed explanations!',
		'debug-controls-hint': '🎮 **Controls:** Use **Start** to run automatically, **Next Step** to go line-by-line, and **Reset** to start over. Adjust speed with the slider.',
		'variables-hint': '📊 **Variables Window:** This shows the current values of all variables as the code executes. Watch how `Sum` and `i` change as the program runs!',
		
		keywords: {
			'Sum': {
				title: 'Variable: Sum',
				desc: '**Sum** is like a special box or container that stores information in the computer\'s memory. Think of it like a labeled jar where you can put numbers. **"Sum"** is the name we gave to this particular box. Throughout our program, we use this box to keep track of the running total as we add numbers together. Every time we find a number that meets our criteria (divisible by 4), we take what\'s already in the Sum box, add the new number to it, and put the result back in the box.\n\n**Why it matters:** Variables are one of the most fundamental concepts in programming - they let us remember and work with information as our program runs!'
			},
			'For': {
				title: 'For Loop',
				desc: '**For Loop** is a powerful programming tool that repeats a set of instructions multiple times automatically. Instead of writing the same code over and over, we tell the computer "do this 20 times!" In our case, `For i = 1 to 20` means: start counting at 1, do something, then count to 2 and do it again, then 3, and keep going all the way until 20. It\'s like when you count your toys one by one - you\'re doing the same action (counting) but for different items.\n\n**Loop details:** Loops are incredibly useful because they save us from writing repetitive code and let the computer do the boring, repetitive work for us!'
			},
			'i': {
				title: 'Loop Counter: i',
				desc: '**The loop counter `i`** is like a number badge that changes each time we go through the loop. Think of it as a ticket counter at an amusement park that goes 1, 2, 3, 4... The name "i" stands for "index" or "iterator" and it\'s a tradition in programming to use "i" for loop counters. In our program, i starts at 1 on the first loop, becomes 2 on the second loop, then 3, then 4, and continues all the way to 20.\n\n**What it tells us:** Each time through the loop, we check the current value of i to decide what to do. It\'s our way of knowing "which number are we looking at right now?" This counter is automatically increased at the end of each loop iteration!'
			},
			'Select Case': {
				title: 'Select Case Statement',
				desc: '`Select Case` is a way to make a choice from several options based on ONE value. The key idea is: the computer first calculates the value inside the parentheses, and then it looks for a Case that matches that value.\n\nIn this program we write: `Select Case (i Mod 4)`.\n- `i Mod 4` means: "divide i by 4 and keep only the remainder (the leftover)."\n- That remainder will always be 0, 1, 2, or 3.\n\nHow the matching works (beginner version):\n- Step 1: The computer computes the expression once. Example: if `i = 12`, then `12 Mod 4 = 0`.\n- Step 2: It compares that result to each `Case` in order.\n  - If the result is `0`, it matches `Case 0`.\n  - If the result is `1`, `2`, or `3`, it matches `Case 1,2,3` (this Case lists multiple matching values).\n- Step 3: When it finds the first matching Case, it runs the code under that Case.\n- Step 4: It skips the other Cases and continues after `End Select`.\n\nSo in our code: `Case 0` means "this number divides evenly by 4, so add it to Sum." The other Case means "not divisible by 4, so do nothing."'
			},
			'Mode': {
				title: 'Modulo Operation (Mod)',
				desc: '**Modulo** operation (written as `Mod` or sometimes `%`) is a special math operation that finds the **remainder** after division. When you divide one number by another, sometimes there\'s a leftover - that\'s the remainder!\n\n**Example:** If you have 7 cookies and want to share them equally among 4 friends, each friend gets 1 cookie (7÷4=1), and you have 3 cookies left over. So `7 Mod 4 = 3`.\n\n**Why we use it here:** In our program, we use Mod 4 to check if numbers are perfectly divisible by 4. If a number Mod 4 equals 0, it means there\'s NO remainder - the number divides perfectly! This is super useful for checking if numbers are even, odd, or divisible by specific numbers. It\'s like asking "do these puzzle pieces fit exactly, or are there some left over?"'
			},
			'Case': {
				title: 'Case Branch',
				desc: '**A Case** is one specific option or branch within a Select Case statement - think of it as one possible choice or outcome. Each Case says "if the value matches THIS, then do THAT."\n\n**In this code:** We have `Case 0`, which means "if the remainder equals 0, do something special," and `Case 1,2,3`, which means "if the remainder is 1, 2, or 3, do something else (or in our case, skip it)." It\'s like having different instructions for different situations: if it\'s raining, bring an umbrella; if it\'s sunny, wear sunglasses; if it\'s snowing, wear a coat.\n\n**Why it helps:** Each Case handles one scenario, making it easy to organize different responses to different conditions. You can have as many Cases as you need for different values!'
			},
			'operator': {
				title: 'Operators',
				desc: '**Operators** are special symbols that tell the computer to perform specific operations or actions on values. The `=` operator is called the **assignment** operator - it puts a value into a variable (like putting something in a box). Don\'t confuse it with math equality! In programming, `Sum = Sum + i` doesn\'t mean Sum equals Sum plus i (which would be impossible); it means "calculate Sum + i, then store the result back in Sum."\n\nThe `+` operator is the **addition** operator - it adds two numbers together. There are many other operators too: `-` for subtraction, `*` for multiplication, and `/` for division. Think of operators as the verbs of programming - they\'re the action words that tell the computer what to DO with your data.\n\n**Why it matters:** Understanding operators is essential because they\'re how we manipulate and transform information!'
			},
			'to': {
				title: 'To Keyword',
				desc: '**`to`** in a For loop defines the ending point of your counting sequence. When we write `For i = 1 to 20`, we\'re telling the computer: start at 1 and keep going **UP TO and INCLUDING** 20. Think of it like saying "from first grade to twelfth grade" - you start at first grade and go through every grade until you complete twelfth grade.\n\n**What it creates:** The `to` keyword creates the range of numbers we want to work with. Without it, the loop wouldn\'t know when to stop! The loop automatically increases the counter (i) by 1 each time and continues until it reaches the `to` number. This is different from some other programming languages where you might specify how much to increase by - here, it automatically goes up by 1 each time. It\'s a simple but powerful way to process a sequence of numbers!'
			},
			'End Select': {
				title: 'End Select',
				desc: '**`End Select`** is a crucial marker that tells the computer "this is where the Select Case statement finishes." Think of it like a closing bracket or the period at the end of a sentence. In programming, many structures have a beginning and an end, and it\'s important to tell the computer where these structures stop. `Select Case` is the opening, and `End Select` is the closing. Everything between these two keywords is part of the same decision-making block. After the computer reaches `End Select`, it knows all the different cases have been checked and handled, so it moves on to execute whatever code comes next in the program. This clear marking of beginnings and endings makes code more organized and helps prevent errors. Without `End Select`, the computer wouldn\'t know where the Select Case statement ends and the next part of the program begins!'
			},
			'Next': {
				title: 'Next Keyword',
				desc: '**`Next`** is the closing marker for a For loop - it tells the computer "we\'ve finished one complete cycle through the loop, now do these important things: 1) Add 1 to the counter variable (i), 2) Check if we\'ve reached the end number yet, and 3) If we haven\'t reached the end, jump back to the start of the loop and do it all again!" Think of it like riding a carousel - each time you complete one full circle and reach the `Next` point, you either go around again or the ride stops if you\'ve done enough circles. The `Next` keyword is what makes the loop actually loop! Without it, the code would only run once. This automatic incrementing and checking is what makes loops so powerful - the computer handles all the repetitive work of counting and checking, so we don\'t have to write the same code 20 times. It\'s one of the fundamental control structures that makes programming efficient and powerful!'
			}
		},
		
		summary: {
			title: 'What This Code Does',
			overview: 'This code finds all numbers from 1 to 20 that are divisible by 4, and adds them together!',
			steps: [
				'Step 1: Set up a “total” — `Sum = 0` means “start the total at zero.”',
				'Step 2: Count from 1 up to 20 — `For i = 1 to 20` makes the computer try each number, one at a time (1, then 2, then 3, ... up to 20).',
				'Step 3: For the current number, find the remainder after dividing by 4 — `(i mod 4)` gives the “leftover” (remainder). Example: `9 mod 4 = 1` because 9 ÷ 4 leaves 1 leftover.',
				'Step 4: Make a decision with `Select Case` — if the remainder is `Case 0`, the number is divisible by 4, so we add it: `Sum = Sum + i`. If it’s `Case 1, 2, or 3`, we do nothing (skip it).',
				'Step 5: Repeat until `Next` finishes the loop — the numbers that get added are 4, 8, 12, 16, and 20, so `Sum` ends up being 60.'
			],
			final: 'Final Result: Sum = 60',
			explanation: 'Because 4 + 8 + 12 + 16 + 20 = 60'
		},
		
		stepExplanations: {
			init: '🎬 Starting the program! We set Sum to 0.',
			loop: '🔄 Loop iteration #{i}: Checking if {i} is divisible by 4...',
			check: '🔍 Calculating {i} mod 4 = {result}',
			add: '✅ {i} is divisible by 4! Adding it to Sum: {prevSum} + {i} = {newSum}',
			skip: '⏭️ {i} is NOT divisible by 4 (remainder is {result}). Skipping...',
			complete: '🎉 Loop complete! Final sum = {sum}'
		}
	},
	ko: {
		'main-title': '🎓 코딩을 배워요!',
		'code-title': '📝 코드',
		'variables-title': '💾 변수',
		'summary-title': '🎯 이 코드는 무엇을 할까요?',
		start: '시작',
		// step: '다음 단계',
		step: '한 줄 실행',
		reset: '초기화',
		speed: '속도:',
		'current-iteration': '현재 반복',
		clickToStart: '👆 시작 버튼을 눌러보세요!',
		'hover-hint': '💡 **팁:** 코드에서 색칠된 키워드를 클릭하면 자세한 설명을 볼 수 있어요!',
		'debug-controls-hint': '🎮 **조작 방법:** **시작** 버튼으로 자동 실행, **다음 단계**로 한 줄씩 진행, **초기화**로 처음부터 다시 시작할 수 있어요. 슬라이더로 속도를 조절할 수 있어요.',
		'variables-hint': '📊 **변수 창:** 코드가 실행되면서 모든 변수의 현재 값을 보여줘요. 프로그램이 실행될 때 `Sum`과 `i`가 어떻게 변하는지 지켜보세요!',
		
		keywords: {
			'Sum': {
				title: '변수: Sum',
				desc: '**Sum**은 컴퓨터 메모리에 정보를 저장하는 특별한 상자나 컨테이너와 같아요. 라벨이 붙은 병에 숫자를 넣는 것처럼 생각해보세요. **"Sum"**은 우리가 이 특정한 상자에 붙인 이름이에요. 프로그램 전체에서 이 상자를 사용해서 숫자들을 더해가면서 누적된 합계를 추적해요. 우리의 조건(4로 나누어떨어지는 수)을 만족하는 숫자를 찾을 때마다, Sum 상자에 이미 들어있는 값을 꺼내서 새로운 숫자를 더한 다음, 그 결과를 다시 상자에 넣어요.\n\n**왜 중요할까요?** 변수는 프로그래밍에서 가장 기본적이고 중요한 개념 중 하나예요 - 변수 덕분에 프로그램이 실행되는 동안 정보를 기억하고 활용할 수 있답니다!'
			},
			'For': {
				title: 'For 반복문',
				desc: '**For 반복문**은 일련의 명령들을 자동으로 여러 번 반복해주는 강력한 프로그래밍 도구예요. 같은 코드를 계속해서 쓰는 대신, 컴퓨터에게 "이것을 20번 해줘!"라고 말하는 거예요. 우리의 경우 `For i = 1 to 20`은: 1부터 세기 시작해서 뭔가를 하고, 그 다음 2로 세고 다시 하고, 그 다음 3, 이렇게 20까지 계속하라는 뜻이에요. 장난감을 하나씩 세는 것과 비슷해요 - 같은 동작(세기)을 하지만 다른 물건들에 대해 하는 거죠.\n\n**어떻게 작동하나요?** 반복문은 반복적인 코드를 쓰지 않아도 되게 해주고, 컴퓨터가 지루하고 반복적인 일을 대신 하게 해주기 때문에 정말 유용해요!'
			},
			'i': {
				title: '반복 카운터: i',
				desc: '**반복 카운터 `i`**는 반복문을 돌 때마다 바뀌는 숫자 배지 같은 거예요. 놀이공원의 표 번호가 1, 2, 3, 4...로 올라가는 것처럼 생각해보세요. "i"라는 이름은 "index(색인)" 또는 "iterator(반복자)"의 약자이고, 프로그래밍에서 반복 카운터에 "i"를 사용하는 것이 전통이에요. 우리 프로그램에서 i는 첫 번째 반복에서 1로 시작하고, 두 번째 반복에서 2가 되고, 그 다음 3, 4가 되고, 20까지 계속돼요.\n\n**무엇을 알려주나요?** 반복문을 돌 때마다 i의 현재 값을 확인해서 무엇을 할지 결정해요. "지금 우리가 보고 있는 숫자는 뭐지?"를 알려주는 방법이에요. 이 카운터는 각 반복이 끝날 때 자동으로 증가해요!'
			},
			'Select Case': {
				title: 'Select Case 문',
				desc: '`Select Case`는 여러 선택지 중에서 **하나의 값**을 기준으로 "어떤 일을 할지" 고르는 문법이에요. 핵심은 딱 하나예요: **괄호 안의 값을 먼저 한 번 계산한 뒤**, 그 결과가 어떤 Case와 같은지 "맞춰보기"를 해요.\n\n이 프로그램에서는 이렇게 써요: `Select Case (i Mod 4)`\n- `i Mod 4`는 "i를 4로 나눈 **나머지(남는 값)**"를 뜻해요.\n- 나머지는 항상 0, 1, 2, 3 중 하나가 돼요.\n\n매칭(일치)되는 방식(초보자 버전):\n- 1단계: 컴퓨터가 식을 **한 번 계산**해요. 예: `i = 12`라면 `12 Mod 4 = 0`.\n- 2단계: 그 결과를 위에서부터 `Case`들과 차례대로 비교해요.\n  - 결과가 `0`이면 `Case 0`과 일치해요.\n  - 결과가 `1`, `2`, `3`이면 `Case 1,2,3`과 일치해요. (이 Case는 여러 값을 "또는(or)"처럼 묶어 둔 거예요.)\n- 3단계: **처음으로 일치하는 Case** 아래의 코드를 실행해요.\n- 4단계: 다른 Case들은 건너뛰고 `End Select` 다음 줄로 넘어가요.\n\n그래서 이 코드에서는 `Case 0`이 "4로 딱 나누어떨어진다 → Sum에 더한다"는 뜻이고, `Case 1,2,3`은 "4로 나누면 남는 게 있다 → 아무것도 안 하고 넘어간다"는 뜻이에요.'
			},
			'Mode': {
				title: '나머지 연산 (Mod)',
				desc: '**Modulo** 연산(`Mod` 또는 때때로 `%`로 쓰여요)은 나눗셈 후에 남은 **나머지**를 찾는 특별한 수학 연산이에요. 한 숫자를 다른 숫자로 나눌 때, 남는 것이 있을 수 있어요 - 그게 바로 나머지예요!\n\n**예시:** 쿠키 7개를 친구 4명과 똑같이 나누려고 하면, 각 친구는 1개씩 받고(7÷4=1), 쿠키 3개가 남아요. 그래서 `7 Mod 4 = 3`이에요.\n\n**왜 쓰는 걸까요?** 우리 프로그램에서는 Mod 4를 사용해서 숫자가 4로 완전히 나누어떨어지는지 확인해요. 어떤 숫자를 Mod 4 했을 때 0이면, 나머지가 없다는 뜻이에요 - 그 숫자가 완벽하게 나누어진다는 거죠! 이것은 숫자가 짝수인지, 홀수인지, 또는 특정 숫자로 나누어떨어지는지 확인하는 데 정말 유용해요. "이 퍼즐 조각들이 정확히 맞아떨어지나요, 아니면 남는 게 있나요?"라고 묻는 것과 같아요.'
			},
			'Case': {
				title: 'Case 분기',
				desc: '**`Case`**는 Select Case 문 안의 하나의 특정 옵션이나 분기예요 - 하나의 가능한 선택이나 결과라고 생각해도 돼요. 각 Case는 "값이 이것과 일치하면, 저것을 해라"라고 말해요.\n\n**이 코드에서:** `Case 0`은 "나머지가 0이면, 특별한 것을 해라"는 뜻이고, `Case 1,2,3`은 "나머지가 1, 2, 또는 3이면, 다른 것을 해라(우리 경우에는 건너뛰기)"는 뜻이에요. 비가 오면 우산을 가져가고, 날씨가 맑으면 선글라스를 쓰고, 눈이 오면 코트를 입는 것처럼 각 상황마다 지시가 달라요.\n\n**왜 도움이 되나요?** 각 Case는 하나의 특정 시나리오를 처리해서, 다른 조건에 대한 다른 반응을 조직하기 쉽게 만들어줘요. 필요한 만큼 많은 Case를 만들 수 있어요!'
			},
			'operator': {
				title: '연산자',
				desc: '**연산자**는 컴퓨터에게 값에 대해 특정 연산이나 동작을 수행하라고 알려주는 특별한 기호예요. `=` 연산자는 **할당 연산자**라고 불러요 - 변수에 값을 넣어요(상자에 무언가를 넣는 것처럼). 수학의 등호와 혼동하지 마세요! 프로그래밍에서 `Sum = Sum + i`는 Sum이 Sum 더하기 i와 같다는 뜻이 아니라(그건 불가능할 거예요), "Sum + i를 계산한 다음, 그 결과를 다시 Sum에 저장해라"는 뜻이에요.\n\n`+` 연산자는 **덧셈** 연산자예요 - 두 숫자를 더해줘요. 다른 많은 연산자들도 있어요: 빼기는 `-`, 곱하기는 `*`, 나누기는 `/`. 연산자를 프로그래밍의 동사라고 생각해보세요 - 컴퓨터에게 데이터로 무엇을 하라고 알려주는 행동 단어예요.\n\n**왜 알아야 하나요?** 연산자는 정보를 조작하고 변환하는 방법이에요!'
			},
			'to': {
				title: 'to 키워드',
				desc: '**`to`** 키워드는 For 반복문에서 세기 순서의 끝점을 정의해요. `For i = 1 to 20`이라고 쓸 때, 우리는 컴퓨터에게: 1에서 시작해서 20까지 포함해서 계속 올라가라고 말하는 거예요. "초등학교 1학년부터 고등학교 3학년까지"라고 말하는 것처럼 생각해보세요 - 1학년에서 시작해서 3학년을 마칠 때까지 모든 학년을 거쳐가는 거죠.\n\n**무엇을 만들어주나요?** `to` 키워드가 우리가 작업하고 싶은 숫자의 범위를 만들어줘요. 이것이 없으면, 반복문은 언제 멈춰야 할지 모를 거예요! 반복문은 매번 카운터(i)를 자동으로 1씩 증가시키고 `to` 숫자에 도달할 때까지 계속돼요. 이것은 얼마나 증가시킬지 지정하는 다른 프로그래밍 언어들과는 달라요 - 여기서는 자동으로 매번 1씩 올라가요. 일련의 숫자를 처리하는 간단하지만 강력한 방법이에요!'
			},
			'End Select': {
				title: 'End Select',
				desc: '**`End Select`**는 컴퓨터에게 "Select Case 문이 여기서 끝나요"라고 알려주는 중요한 표시예요. 닫는 괄호나 문장 끝의 마침표처럼 생각해보세요. 프로그래밍에서 많은 구조들은 시작과 끝이 있고, 컴퓨터에게 이 구조들이 어디서 멈추는지 알려주는 것이 중요해요. `Select Case`가 시작이고, `End Select`가 끝이에요. 이 두 키워드 사이의 모든 것이 같은 의사 결정 블록의 일부예요. 컴퓨터가 `End Select`에 도달하면, 모든 다른 case들이 확인되고 처리되었다는 것을 알고, 프로그램에서 다음에 오는 코드를 실행하러 넘어가요. 시작과 끝을 명확하게 표시하는 것은 코드를 더 조직적으로 만들고 오류를 방지하는데 도움을 줘요. `End Select`가 없으면, 컴퓨터는 Select Case 문이 어디서 끝나고 프로그램의 다음 부분이 어디서 시작하는지 알 수 없을 거예요!'
			},
			'Next': {
				title: 'Next 키워드',
				desc: '**`Next`**는 For 반복문의 닫는 표시예요 - 컴퓨터에게 "반복문의 한 사이클을 완료했으니, 이제 이런 중요한 일들을 해라: 1) 카운터 변수(i)에 1을 더해라, 2) 끝 숫자에 도달했는지 확인해라, 그리고 3) 끝에 도달하지 않았으면, 반복문의 시작으로 돌아가서 다시 모든 것을 해라!"라고 말해요. 회전목마를 타는 것처럼 생각해보세요 - 한 바퀴를 완전히 돌아서 `Next` 지점에 도달할 때마다, 충분한 바퀴를 돌았으면 놀이기구가 멈추거나 아니면 다시 한 바퀴 도는 거죠. `Next` 키워드가 반복문을 실제로 반복하게 만들어요! 이것이 없으면, 코드는 단 한 번만 실행될 거예요. 이 자동 증가와 확인이 반복문을 그렇게 강력하게 만드는 거예요 - 컴퓨터가 세고 확인하는 모든 반복적인 작업을 처리해서, 우리가 같은 코드를 20번 쓰지 않아도 돼요. 프로그래밍을 효율적이고 강력하게 만드는 기본적인 제어 구조 중 하나예요!'
			}
		},
		
		summary: {
			title: '이 코드가 하는 일',
			overview: '이 코드는 1부터 20까지의 숫자 중에서 4로 나누어떨어지는 숫자들을 찾아서 모두 더해요!',
			steps: [
				'1단계: “합계 상자”를 준비해요 — `Sum = 0`은 “합계를 0부터 시작하자”는 뜻이에요.',
				'2단계: 1부터 20까지 세어가며 확인해요 — `For i = 1 to 20`은 1, 2, 3, ... 20을 **하나씩** 차례대로 검사하게 해줘요.',
				'3단계: 지금 숫자를 4로 나눴을 때 나머지를 구해요 — `(i mod 4)`는 “남는 값(나머지)”이에요. 예: `9 mod 4 = 1` (9를 4로 나누면 1이 남아요).',
				'4단계: `Select Case`로 결정해요 — 나머지가 `Case 0`이면 4로 나누어떨어지므로 `Sum = Sum + i`로 더해요. 나머지가 `Case 1, 2, 3`이면 아무것도 하지 않고(그냥 건너뛰고) 넘어가요.',
				'5단계: `Next`로 반복을 끝까지 돌려요 — 더해지는 숫자는 4, 8, 12, 16, 20이고, 그래서 `Sum`은 최종적으로 60이 돼요.'
			],
			final: '최종 결과: Sum = 60',
			explanation: '왜냐하면 4 + 8 + 12 + 16 + 20 = 60'
		},
		
		stepExplanations: {
			init: '🎬 프로그램을 시작해요! Sum을 0으로 설정해요.',
			loop: '🔄 {i}번째 반복: {i}가 4로 나누어떨어지는지 확인해요...',
			check: '🔍 {i}를 4로 나눈 나머지 = {result}',
			add: '✅ {i}는 4로 나누어떨어져요! Sum에 더해요: {prevSum} + {i} = {newSum}',
			skip: '⏭️ {i}는 4로 나누어떨어지지 않아요 (나머지가 {result}). 건너뛰어요...',
			complete: '🎉 반복 완료! 최종 합계 = {sum}'
		}
	}
};

export const getTranslation = (lang: Language) => translations[lang];
